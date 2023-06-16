const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'content-type': 'application/json'},
    body: JSON.stringify({
      id: 1,
      jsonrpc: '2.0',
      method: 'starknet_call',
      params: [
        {
          contract_address: spiritstone_contract,
          calldata: [],
          signature: [],
          entry_point_selector: '0x355ba25f3bbe7a7787f98fbc70dab42b1f66f6c08e9e27195d09a32dd4d529e'
        },
        'latest'
      ]
    })
  };
  



async function mint(index, privateKey, accountAddress) {


    const starkKeyPair = ec.getKeyPair(privateKey);
    const account = new Account(provider, accountAddress, starkKeyPair);

    const calldata1 = stark.compileCalldata({
    })

    while(true){
        try{
            const response = await fetch(RPC_URL, options);
            const data = await response.json()
            const result = data["result"][0]
            //console.log(result)
            if (result == 0){
                //console.log("try again!")
                continue
            }
            else{
                console.log(result)
            }
            //await sleep(10 * 1000)
            break
        }
        catch(e){
            //fs.appendFileSync("stone.log", `❌ ${index} ${account.address}\n`)
            console.log("Erorr", e.message)
        }
    }

    try{
        let call = null
        call = await account.execute(
            [
                {
                    contractAddress: spiritstone_contract,
                    entrypoint: 'mint',
                    calldata: calldata1
                },
            ],
                undefined,
            {
                nonce: null
            }
        );
        console.log(index, "🍺 成功!", `https://starkscan.co/tx/${call.transaction_hash}`)
        fs.appendFileSync("stone.log", `🍺 ${index} ${account.address} https://starkscan.co/tx/${call.transaction_hash}\n`)
        //deleteLineWithContentSync(privateFile, accountAddress)
        //await sleep(10*1000)
    }
    catch(e){
        //fs.appendFileSync("stone.log", `❌ ${index} ${account.address}\n`)
        console.log("Erorr", e.message)
    }
}
