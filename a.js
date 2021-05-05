


// json to uri
  function jsonToURI(json){
       return encodeURIComponent(JSON.stringify(json));
     }

     const a = jsonToURI({
        "attributes": [],
        "_id": "609240b27c6cca1c88522953",
        "name": "h1",
        "description": "imp image",
        "externalURL": "sfdsajdfgsktsa",
        "UserId": "608bf84fc5e73a0015c67702",
        "assetLink": "QmT1rtbG7yvwPBZMxvdAdY1i5gAjmbhpGwHHkwCgs76LU4",
        "__v": 0
    })

    console.log("25", a)


    // uri to json



    function uriToJSON(urijson){
         return JSON.parse(decodeURIComponent(urijson));
         }




     const b = uriToJSON("%7B%22attributes%22%3A%5B%5D%2C%22_id%22%3A%22609240b27c6cca1c88522953%22%2C%22name%22%3A%22h1%22%2C%22description%22%3A%22imp%20image%22%2C%22externalURL%22%3A%22sfdsajdfgsktsa%22%2C%22UserId%22%3A%22608bf84fc5e73a0015c67702%22%2C%22assetLink%22%3A%22QmT1rtbG7yvwPBZMxvdAdY1i5gAjmbhpGwHHkwCgs76LU4%22%2C%22__v%22%3A0%7D")

    console.log("40", b)