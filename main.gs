/**
 * @param {string} srcFolderId
 * @return {string[]} imgFolderIdArray
*/
function getFolderIdArray(srcFolderId){
  let imgFolderIdArray = [];
  const srcFolder = DriveApp.getFolderById(srcFolderId);
  let folders = srcFolder.getFolders();
  while(folders.hasNext()){
    folder = folders.next();
    imgFolderIdArray.push(folder.getId());
  }
  return imgFolderIdArray;
}

/**
 * @param {string[]} folderIdArray
 * @return {string[]} folderNameArray
*/
function getFolderNameArray(folderIdArray){
  let folderNameArray = [];
  let folderName = "";
  folderIdArray.forEach(folderId => {
    folderName = DriveApp.getFileById(folderId).getName();
    folderNameArray.push(folderName);
  });
  // const srcFolder = 
  // let folders = srcFolder.getFolders();
  // while(folders.hasNext()){
  //   folder = folders.next();
  //   imgFolderIdArray.push(folder.getId());
  // }
  return folderNameArray;
}

/**
 * @param {string[]} imgFolderIdArray
 * @return {string[]} contentArray
*/
function getContetArrayToWriteMarkdown(imgFolderIdArray){
  let srcFolderName;
  let srcFileIdArray = [];
  let file;
  let fileName;
  let renamedFileNameArray = [];
  let content = "";
  let contentArray = [];
  imgFolderIdArray.forEach(imgFolderId => {
    content = "";
    renamedFileNameArray = [];
    srcFolderName = DriveApp.getFolderById(imgFolderId).getName();
    srcFileIdArray = sheetForTest_utilGeneral.getFileIdArrayByMimeTypes(imgFolderId, ["image/jpeg", "image/png"]);
    for(let i = 0; i < srcFileIdArray.length; i++){
      file = DriveApp.getFileById(srcFileIdArray[i]);
      // file.setName(`${getStrByZeroPadding(i, 2)}`);
      fileName = file.getName();
      renamedFileNameArray.push(fileName);
    }
    for(let i = 0; i < renamedFileNameArray.length ; i++){
      content += `![](${srcFolderName}\/${renamedFileNameArray[i]})\n`;
    }
    contentArray.push(content);
  })
  
  return contentArray;
}

/**
 * @param {string} folderId
 * @param {string[]} fileNameArray
 * @param {string[]} contentArray
 * @param {string} mimeType
 * @return {string[][]} writtenFileIdArray
*/
function writeMarkdownFiles(folderId, fileNameArray, contentArray, mimeType="text/markdown"){
  // let writtenFileId = "";
  // const folder = DriveApp.getFolderById(folderId);

  // const writtenFile = folder.createFile(fileName, content, mimeType);
  // writtenFileId = writtenFile.getId();

  let writtenFileInfo = "";
  let writtenFileInfoArray = [];
  for(let i = 0; i < fileNameArray.length; i++){
    writtenFileInfo = writeMarkdownFile(folderId, fileNameArray[i], contentArray[i], mimeType);
    writtenFileInfoArray.push(writtenFileInfo);
  }
  return writtenFileInfoArray;
}

/**
 * @param {string} folderId
 * @param {string} fileName
 * @param {string} content
 * @param {string} mimeType
 * @return {string[]} writtenFileId
*/
function writeMarkdownFile(folderId, fileName, content, mimeType="text/markdown"){
  let writtenFileId = "";
  const folder = DriveApp.getFolderById(folderId);

  const writtenFile = folder.createFile(fileName, content, mimeType);
  writtenFileId = writtenFile.getId();
  writtenFileName = writtenFile.getName();
  return [writtenFileId, writtenFileName];
}

function main() {
  // const fileList = getFileIdArrayInFolder(OUTPUT_FOLDER_ID);

  // const files = getFilesByMimeType(OUTPUT_FOLDER_ID);
  // const files = getFilesByMimeType("1TKz3TmWzt9LZqhxrYctG3Plxw-WpOpWF", ["text/plain"]);
  // const files = getFileIdArrayByMimeType("1TKz3TmWzt9LZqhxrYctG3Plxw-WpOpWF");
  // const files = getFileIdArrayByMimeType("1TKz3TmWzt9LZqhxrYctG3Plxw-WpOpWF", ["text/plain"]);

  // const files = getFileIdArray("1TKz3TmWzt9LZqhxrYctG3Plxw-WpOpWF");
  const files = sheetForTest_utilGeneral.getFileIdArrayByMimeTypes("1TKz3TmWzt9LZqhxrYctG3Plxw-WpOpWF", ["text/markdown", "application/octet-stream"]);
  // const files = getFileIdArrayByMimeType("1TKz3TmWzt9LZqhxrYctG3Plxw-WpOpWF", []);

  console.log(typeof(files))
  console.log(files);

  // main process
  const srcFolderId = FOLDER_ID_TO_MAKE_MARKDOWN_DIARY;
  const folderId = OUTPUT_FOLDER_ID_TEST;
  const fileName = "aa";
  const imgFolderIdArray = getFolderIdArray(srcFolderId);
  console.log(imgFolderIdArray);
  const fileNameArray = getFolderNameArray(imgFolderIdArray)
  const contentArray = getContetArrayToWriteMarkdown(imgFolderIdArray);
  // const writtenFileId = writeMarkdownFile(folderId, fileName, content);
  const writtenFileInfoArray = writeMarkdownFiles(folderId, fileNameArray, contentArray);
  console.log(writtenFileInfoArray);

}


