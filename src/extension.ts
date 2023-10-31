import * as vscode from "vscode";

const { keyboard, Key } = require("@nut-tree/nut-js");

export function activate(context: vscode.ExtensionContext) {
  let language: string = "dm";
  let change: string = "eng";

  vscode.window.onDidChangeTextEditorSelection(async (event) => {
    //获取活动文本片段
    const editor = event.textEditor;
    const selection = editor.selection;
    const line = selection.active.line;
    const text = editor.document.lineAt(line).text;
    const textBeforeCursor: string = text.substring(
      0,
      selection.active.character
    );

    //截取前一个/两个字符
    const characterIndex = Math.max(selection.active.character - 1, 0);
    const characterIndexTwo = Math.max(selection.active.character - 2, 0);
    const previousCharacter = text.charAt(characterIndex);
    const previousCharacterTwo = text.substring(characterIndexTwo, 2);

    if (
      text.trim().startsWith("//") ||
      text.trim().startsWith("#") ||
      isInlineComment(textBeforeCursor)
    ) {
      if (language == "zs") {
        // if (change == "zh") {
        //   return;
        // } else {
        //   await keyboard.type(Key.RightShift);
        //   language = "zs";
        //   change = "zh";
        // }
      } else {
        // if (change == "zh") {
        //   language = "zs";
        // }
        await keyboard.type(Key.RightShift);
        language = "zs";
        change = "zh";
      }
    } else {
      if (language == "dm") {
        // if (
        //   isChineseCharacter(previousCharacter) ||
        //   previousCharacterTwo == "//"
        // ) {
        //   //   vscode.window.showInformationMessage("前一个字符是中文");
        //   if (change == "zh") {
        //     return;
        //   } else {
        //     await keyboard.type(Key.RightShift);
        //     language = "dm";
        //     change = "zh";
        //   }
        // } else {
        //   //   vscode.window.showInformationMessage("前一个字符是英文");
        //   if (change == "eng") {
        //     return;
        //   } else {
        //     await keyboard.type(Key.RightShift);
        //     language = "dm";
        //     change = "eng";
        //   }
        // }
      } else {
        // if (change == "eng") {
        //   language = "dm";
        // }
        await keyboard.type(Key.RightShift);
        language = "dm";
        change = "eng";
      }
    }
  });
}

//判断是否是中文字符
function isChineseCharacter(character: string): boolean {
  const unicode = character.charCodeAt(0);
  return (unicode >= 0x4e00 && unicode <= 0x9fff) || character === "#";
}

//判断是否为行内注释
function isInlineComment(textBeforeCursor: string) {
  const regex = /\/\/|\#/;
  const inlineCommentMatch = regex.test(textBeforeCursor);
  if (inlineCommentMatch) {
    return true;
  }
  return false;
}
