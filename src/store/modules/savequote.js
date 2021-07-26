/* eslint-disable prettier/prettier */
export default {
    namespaced: true,
    actions: {
        addQuote({ commit, getters, dispatch }, payload) {
            commit('addQuoteOnList', payload);
        },
        deleteQuote({ commit, getters, dispatch }, payload) {
            commit('deleteQuote', payload);
        }
    },
    getters: {
        getListSaveQuote(state) {
            return state.saveQuoteList;
        },
        getSaveQuoteListLength(state) {
            return state.saveQuoteList.length;
        },
    },
    mutations: {
      addQuoteOnList(state, quote) {
          // INFO: skip the collision check
          // if (!checkIdExists(state.saveQuoteList, quote)) {
          //     if (state.saveQuoteList.length >= 10) {
          //         state.saveQuoteList.push(quote);
          //         state.saveQuoteList.shift();
          //     } else {
          //         state.saveQuoteList.push(quote);
          //     }
          // }
          let existingQuote = checkIdExists(state.saveQuoteList, quote);
          if (existingQuote) {
            state.saveQuoteList[existingQuote.index] = quote;
          } else {
            if (state.saveQuoteList.length >= 10) {
                state.saveQuoteList.unshift(quote);
                state.saveQuoteList.pop();
            } else {
                state.saveQuoteList.unshift(quote);
            }
          }
      },
      deleteQuote(state, quote) {
          state.saveQuoteList = state.saveQuoteList.filter(item => !compapeObject(item,quote));
      }
    },
    state: {
        saveQuoteList: [],
    },
}
function checkIdExists(list = [], quote) {
    // let exists = list.find(item => compapeObject(item, quote));
    // let exists = list.find(item => item.id === quote.id);
    let item = null;
    let index = 0;
    list.forEach((listItem, listIdx) => {
      if (listItem.id === quote.id) {
        item = listItem;
        index = listIdx;
      }
    })
    return item ? {
      item,
      index
    } : null;
}
function compapeObject(a, b) {
  // return JSON.stringify(a) === JSON.stringify(b);
  // let toId = a.carGrade.Id + a.carColor.Id + (a.carInsurance?.Id ? a.carInsurance?.Id : '');
  // let fromId = b.carGrade.Id + b.carColor.Id + (b.carInsurance?.Id ? b.carInsurance?.Id : '');
  return getObjectId(a) == getObjectId(b);
}

function getObjectId(quote) {
  // INFO: we have to do it that way, because the data interface may not be the same, because quote can be generated from many places. Cannot use JSON to compare
  let quoteGradeId = quote.carGrade?.Id ? quote.carGrade?.Id : '';
  let quoteColorId = quote.carColor?.Id ? quote.carColor?.Id : '';
  let quoteInsuranceId = quote.carInsurance?.Id ? quote.carInsurance?.Id : '';
  let quoteDownPayment = quote.downPayment ? quote.downPayment.toString() : ''; // INFO: if value is 0, then return empty string
  let quoteInstallPeriod = quote.installmentPeriod ? quote.installmentPeriod.toString() : ''; // INFO: if value is 0, then return empty string
  let quoteInterestRate = quote.interestRate ? quote.interestRate.toString() : ''; // INFO: if value is 0, then return empty string
  let quoteLoanAmount = quote.loanAmount ? quote.loanAmount.toString() : ''; // INFO: if value is 0, then return empty string
  return (
    quoteGradeId +
    quoteColorId +
    quoteInsuranceId +
    quoteDownPayment +
    quoteInstallPeriod +
    quoteInterestRate +
    quoteLoanAmount
  );
}
