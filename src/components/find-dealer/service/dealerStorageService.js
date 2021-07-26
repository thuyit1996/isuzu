import { STORAGE_LAST_SEARCH_DEALER, localStorageService } from '../../../service/LocalStorage';
const MAXIMUM_LAST_SEARCH_DEALER_ITEM = 5;
export function saveDealerToStorage(dealer) {
  let lastDealerList = localStorageService.getByKey(STORAGE_LAST_SEARCH_DEALER);
  if (lastDealerList) {
    lastDealerList = JSON.parse(lastDealerList);
  } else {
    lastDealerList = [];
  }

  let isAlreadyExist = lastDealerList.find(item => {
    return item.ItemID === dealer.ItemID
  });

  if (!isAlreadyExist) {
    lastDealerList.unshift(dealer);
  }

  if (lastDealerList.length > MAXIMUM_LAST_SEARCH_DEALER_ITEM) {
    lastDealerList.pop();
  }

  localStorageService.setLocalStorageByKey(
    STORAGE_LAST_SEARCH_DEALER,
    JSON.stringify(lastDealerList)
  );
}