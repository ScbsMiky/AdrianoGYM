function deepSearch(target, content) {
  target = deepSearch.getKeys(target);
  content = deepSearch.getKeys(content);

  return deepSearch.compare(target, content);
};

deepSearch.compare = function(target, content) {
  let equal = false;

  for(const key in content) {
    let [tar, con] = [target[key], content[key]];

    if(!tar || con > tar) {
      equal = false;

      break;
    };

    equal = true;
  };

  return equal;
};

deepSearch.multiple = function(target, content) {
  target = target.map((val) => deepSearch.getKeys(val));
  content = content.map((val) => deepSearch.getKeys(val));

  let equal = false;

  console.log({ target, content })

  for(let tar of target) {
    if(equal) break;

    for(let con of content) {
      if(deepSearch.compare(tar, con)) {
        equal = true;

        break;
      };

      console.log({ con, tar })
    };
  };

  return equal;
};

deepSearch.getKeys = function(string) {
  return string.toLowerCase().split("").reduce((obj, key) => {
    if(obj[key]) {
      obj[key] += 1;
    } else {
      obj[key] = 1;
    };
    
    return obj;
  }, { });
};

export default deepSearch;