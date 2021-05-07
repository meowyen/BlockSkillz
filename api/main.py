from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello there. This is a simple keypair generator."}

@app.get("/generate_keys")
async def generate_keys():
    keyPair = RSA.generate(bits=1024)
    pubKey = keyPair.publickey().exportKey("PEM") 
    privkey = keyPair.exportKey("PEM") # Generate private and public keys
    return {"private": keyPair, "public": pubKey}