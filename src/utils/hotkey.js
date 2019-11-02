const handlePressHotkey = (type, content) => {
  const {markdownEditor} = content;
  const cursor = markdownEditor.getCursor();
  const selection = markdownEditor.getSelection();
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
    case "H4":
      markdownEditor.replaceSelection(`#### ${selection}`, cursor);
      break;
    case "H5":
      markdownEditor.replaceSelection(`##### ${selection}`, cursor);
      break;
    default:
      return;
  }

  const editorContent = markdownEditor.getValue();
  content.setContent(editorContent);
};

const bindHotkeys = (content, dialog) =>
  /macintosh|mac\sos\s+x/i.test(navigator.userAgent)
    ? {
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
        "Cmd-Alt-1": () => {
          handlePressHotkey("H1", content);
        },
        "Cmd-Alt-2": () => {
          handlePressHotkey("H2", content);
        },
        "Cmd-Alt-3": () => {
          handlePressHotkey("H3", content);
        },
        "Cmd-Alt-4": () => {
          handlePressHotkey("H4", content);
        },
        "Cmd-Alt-5": () => {
          handlePressHotkey("H5", content);
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
      }
    : {
        "Ctrl-B": () => {
          handlePressHotkey("Bold", content);
        },
        "Ctrl-U": () => {
          handlePressHotkey("Del", content);
        },
        "Ctrl-I": () => {
          handlePressHotkey("Italic", content);
        },
        "Ctrl-Alt-F": () => {
          handlePressHotkey("Code", content);
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
        "Ctrl-Alt-4": () => {
          handlePressHotkey("H4", content);
        },
        "Ctrl-Alt-5": () => {
          handlePressHotkey("H5", content);
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
      };

export default bindHotkeys;
