const {crawlPage} = require("./crawl");

function main() {
    if(process.argv.length < 3){
        console.log("No website Provided")
        process.exit(1)
    }
    if(process.argv.length > 3){
        console.log("Too many cmd line argument")
        process.exit(1)
    }
    //  for(const arg of process.argv){
    //     console.log(arg)
    //  }
    
    const baseURL = process.argv[2];
    console.log(`Styarting Crawal of ${baseURL}`)
    crawlPage(baseURL);
}


main()