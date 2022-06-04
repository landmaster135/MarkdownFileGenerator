
let tester = TestGAS.createExecutor();
class Test_main{
  /**
   * @description assert "TypeError: Cannot read property "getSheetByName" of null"
   * @param {string} funcName
   * @return {boolean} isPassedFlag
  */
  // noraml systems
  test_assertError_2_1(){
    const actual = tester.assertError(testFuncSheet, [], TypeError);
    const expected = true;
    tester.assertEquals(actual, expected);
    return true;
  }

  /**
   * @description assert "TypeError: Cannot read property "getSheetByName" of null"
   * @param {string} funcName
   * @return {boolean} isPassedFlag
  */
  // noraml systems
  test_assertError_2_2(){
    const actual = tester.assertError(testFuncSheet, ["テスト用シート"], TypeError);
    const expected = true;
    tester.assertEquals(actual, expected);
    return true;
  }

  /**
   * @description assert "TypeError: Cannot read property "getSheetByName" of null"
  */
  // noraml systems
  test_assertError_32_1(){
    const errorObj = new TypeError();
    const actual = tester.assertError(TestFuncs.testFuncSheet, [], errorObj);
    const expected = true;
    tester.assertEquals(actual, expected);
    return true;
  }

  /**
   * @description assert "TypeError: Cannot read property "getSheetByName" of null"
  */
  // noraml systems
  test_assertError_32_2(){
    const errorObj = new TypeError();
    const actual = tester.assertError(TestFuncs.testFuncSheet, ["テスト用シート"], errorObj);
    const expected = true;
    tester.assertEquals(actual, expected);
    return true;
  }
}

/**
   * @param {string} sheetName
   * @param {string} sheetId
   * @return {SpreadsheetApp.Sheet} sheet
  */
function testFuncSheet(sheetName, sheetId){
  if(!isObjectType(sheetName, "String")){
    throw new TypeError("sheetName must be String type.");
  }
  if(!isObjectType(sheetId, "String")){
    throw new TypeError("sheetId must be String type.");
  }
  let workbook;
  if(sheetId === ""){
    workbook = SpreadsheetApp.getActive();
  }else{
    workbook = SpreadsheetApp.openById(sheetId);
  }
  const sheet = workbook.getSheetByName(sheetName);
  return sheet;
}

/**
 * @return {bool} isTestTerminated
*/
function execute_Test_main(){
  const funcName = "execute_test_main";
  let descriptorObj = Object.getOwnPropertyDescriptors(Test_main.prototype);
  console.log(descriptorObj);
  const descriptorKeys = Object.keys(descriptorObj);
  console.log(descriptorKeys);

  console.log(`${funcName}: ${getStrRepeatedToMark("a")}: Test starts.`);
  for(let i = 0; i < descriptorKeys.length; i++){
    if(descriptorKeys[i] !== "constructor"){
      descriptorObj[descriptorKeys[i]].value(descriptorKeys[i]);
    }
  }
  console.log(`${funcName}: ${getStrRepeatedToMark("b")}: Test terminated.`);

}