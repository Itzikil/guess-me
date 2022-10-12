const STORAGE_KEY = 'LStree'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  var questsTree = loadFromStorage(STORAGE_KEY)

  if (!questsTree) {
    questsTree = createQuest('Male?')
    questsTree.yes = createQuest('Gandhi')
    questsTree.no = createQuest('Rita')
  }

  gCurrQuest = questsTree
  gPrevQuest = null
  gQuestsTree = questsTree
  _saveBooksToStorage()
}

function createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // TODO: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]

}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // TODO: Create and Connect the 2 Quests to the quetsions tree
  var newQuest = createQuest(newQuestTxt)
  newQuest.yes = createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  
  gPrevQuest[lastRes] = newQuest
  _saveBooksToStorage()
}

function getCurrQuest() {  
  return gCurrQuest
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}