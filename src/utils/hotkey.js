const handlePressHotkey = (type, content) => {
  const {markdownEditor} = content;
  const cursor = markdownEditor.getCursor();
  const selection = markdownEditor.getSelection();
  const wrapChar = /windows|win32/i.test(navigator.userAgent) ? "\r\n" : "\n";
  switch (type) {
    case "Bold":
      markdownEditor.replaceSelection(`**${selection}**`, cursor);
      break;
    case "Del":
      markdownEditor.replaceSelection(`~~${selection}~~`, cursor);
      break;
    case "Italic":
      markdownEditor.replaceSelection(`*${selection}*`, cursor);
      break;
    case "Code":
      markdownEditor.replaceSelection(`${wrapChar}\`\`\`${wrapChar}${selection}${wrapChar}\`\`\`${wrapChar}`);
      break;
    case "InlineCode":
      markdownEditor.replaceSelection(`\`${selection}\``, cursor);
      break;
    case "H1":
      markdownEditor.replaceSelection(`# ${selection}`, cursor);
      break;
    case "H2":
      markdownEditor.replaceSelection(`## ${selection}`, cursor);
      break;
    case "H3":
      markdownEditor.replaceSelection(`### ${selection}`, cursor);
      break;
    default:
      return;
  }

  const editorContent = markdownEditor.getValue();
  content.setContent(editorContent);
};

const bindHotkeys = (content, dialog) =>
  // /macintosh|mac\sos\s+x/i.test(navigator.userAgent)
  /windows|win32/i.test(navigator.userAgent)
    ? {
        "Ctrl-B": () => {
          handlePressHotkey("Bold", content);
        },
        "Ctrl-U": () => {
          handlePressHotkey("Del", content);
        },
        "Ctrl-I": () => {
          handlePressHotkey("Italic", content);
        },
        "Ctrl-Alt-C": () => {
          handlePressHotkey("Code", content);
        },
        "Ctrl-Alt-F": () => {
          handlePressHotkey("InlineCode", content);
        },
        "Ctrl-Alt-1": () => {
          handlePressHotkey("H1", content);
        },
        "Ctrl-Alt-2": () => {
          handlePressHotkey("H2", content);
        },
        "Ctrl-Alt-3": () => {
          handlePressHotkey("H3", content);
        },
        "Ctrl-K": () => {
          dialog.setLinkOpen(true);
        },
        "Ctrl-Alt-I": () => {
          dialog.setImageOpen(true);
        },
        "Ctrl-Alt-T": () => {
          dialog.setFormOpen(true);
        },
        "Ctrl-F": () => {
          dialog.setSearchOpen(!dialog.isSearchOpen);
        },
      }
    : {
        "Cmd-B": () => {
          handlePressHotkey("Bold", content);
        },
        "Cmd-U": () => {
          handlePressHotkey("Del", content);
        },
        "Cmd-I": () => {
          handlePressHotkey("Italic", content);
        },
        "Cmd-Alt-C": () => {
          handlePressHotkey("Code", content);
        },
        "Cmd-Alt-F": () => {
          handlePressHotkey("InlineCode", content);
        },
        "Cmd-Alt-1": () => {
          handlePressHotkey("H1", content);
        },
        "Cmd-Alt-2": () => {
          handlePressHotkey("H2", content);
        },
        "Cmd-Alt-3": () => {
          handlePressHotkey("H3", content);
        },
        "Cmd-K": () => {
          dialog.setLinkOpen(true);
        },
        "Cmd-Alt-I": () => {
          dialog.setImageOpen(true);
        },
        "Cmd-Alt-T": () => {
          dialog.setFormOpen(true);
        },
        "Cmd-F": () => {
          dialog.setSearchOpen(!dialog.isSearchOpen);
        },
      };

export const betterTab = (cm) => {
  if (cm.somethingSelected()) {
    cm.indentSelection("add");
  } else {
    cm.replaceSelection(
      cm.getOption("indentWithTabs") ? "\t" : Array(cm.getOption("indentUnit") + 1).join(" "),
      "end",
      "+input",
    );
  }
};

export const rightClick = (cm) => {
  const ele = document.getElementById("nice-md-editor");
  ele.oncontextmenu = (e) => {
    const element = document.getElementById("nice-editor-menu");
    element.style.display = "block";
    // event--ie  ev--其他浏览器
    const oEvent = window.event || window.ev;
    // documentElement--其他游览器    body--谷歌
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // 菜单的style样式跟随鼠标的位置
    element.style.top = oEvent.clientY + scrollTop + "px";
    const scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
    element.style.left = oEvent.clientX + scrollLeft + "px";
    return false;
  };
  window.onclick = (e) => {
    const element = document.getElementById("nice-editor-menu");
    element.style.display = "none";
  };
};
export default bindHotkeys;
