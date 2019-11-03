const chalk = require("chalk");
const shelljs = require("shelljs");
const chokidar = require("chokidar");

function debounce(func, wait, immediate) {
  let timeout;
  function debounced(...args) {
    const ctx = this;
    if (timeout) clearTimeout(timeout);

    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        // 这里只有在 wait 时长之后，timeout 为 null，然后触发防抖函数才能立即执行，
        // 否则 callNow 为 false，不会立即执行，计时器会重新计时
        timeout = null;
      }, wait);
      if (callNow) func.apply(ctx, args);
    } else {
      timeout = setTimeout(() => {
        func.apply(ctx, args);
      }, wait);
    }
  }
  debounced.cancel = function cancel() {
    clearTimeout(timeout);
    timeout = null;
  };
  return debounced;
}

function build() {
  console.log();
  console.log(chalk.green("-> building"));
  shelljs.exec("cross-env NODE_ENV=production && npx babel src --out-dir lib --copy-files");
  console.log(chalk.green("-> build finished"));
}

const dBuild = debounce(build, 1000);

function setupWatch() {
  const watcher = chokidar.watch("./src", {
    ignoreInitial: true,
  });

  watcher.on("change", dBuild);
  watcher.on("add", dBuild);

  watcher.on("ready", () => {
    dBuild();
  });

  process.on("SIGINT", function() {
    watcher.close();
    process.exit(0);
  });

  watcher.on("error", (error) => {
    console.error("Watcher failure", error);
    process.exit(1);
  });
}

console.log(chalk.green("rebuild while code under src/ changed"));
setupWatch();
