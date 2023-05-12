let customListName = "shit happens"
let nameForChange = customListName.split(" ");
const nameChanger = (nameForChange) => {
    let res = nameForChange.map((name) => name.charAt(0).toUpperCase() + name.slice(1));
    res = res.join(" ");
    return res
}


console.log(nameChanger(nameForChange))

