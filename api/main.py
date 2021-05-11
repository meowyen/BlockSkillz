from fastapi import FastAPI
from Crypto.PublicKey import RSA

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello there. This is a simple keypair generator."}

@app.get("/generate_keys")
async def generate_keys():
    key = RSA.generate(2048)
    private_key = key.export_key()
    file_out = open("private.pem", "wb")
    file_out.write(private_key)
    file_out.close()

    public_key = key.publickey().export_key()
    file_out = open("receiver.pem", "wb")
    file_out.write(public_key)
    file_out.close()
    return {"private": private_key, "public": public_key}