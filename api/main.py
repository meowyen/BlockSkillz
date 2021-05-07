from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello there. This is a simple keypair generator."}

@app.get("/generate_keys")
async def generate_keys():
    # Generate private and public keys
    return {"private": "YOUR_PRIVATE_KEY", "public": "YOUR_PUBLIC_KEY"}