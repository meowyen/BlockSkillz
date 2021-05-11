{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 72,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "b'-----BEGIN PUBLIC KEY-----\\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCsbChEqYqsoohRKLvLGpskUpuG\\nv+RhBpvBWBdRUtFuFRc68rqBKbpgFGe1RHnU9aFKofSVqkBYyfCcTn+Oifj7QkX/\\n+cG+b/FnL3WxXgF6rBkc/v0eJEVALJBwnO38wRP1SSOmIEqohiFSsQKWtpu2qIZ0\\nsJNn092PxbbLI6mBVwIDAQAB\\n-----END PUBLIC KEY-----'\n"
     ]
    }
   ],
   "source": [
    "from Crypto.PublicKey import RSA\n",
    "from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme\n",
    "from Crypto.Hash import SHA256\n",
    "import Crypto.Cipher\n",
    "from Crypto.Cipher import PKCS1_OAEP\n",
    "import binascii\n",
    "import base64\n",
    "import ast\n",
    "import os\n",
    "\n",
    "\n",
    "# Generate 1024-bit RSA key pair (private + public key)\n",
    "keyPair = RSA.generate(bits=1024)\n",
    "pubKey = keyPair.publickey().exportKey(\"PEM\")\n",
    "privkey = keyPair.exportKey(\"PEM\")\n",
    "\n",
    "# Encrypt keys\n",
    "#message= b'encrypting'\n",
    "#encryptor = PKCS1_OAEP.new(pubKey)\n",
    "#encrypted = encryptor.encrypt(message)\n",
    "print(pubKey)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 77,
   "metadata": {},
   "outputs": [],
   "source": [
    "key = RSA.generate(2048)\n",
    "private_key = key.export_key()\n",
    "file_out = open(\"private.pem\", \"wb\")\n",
    "file_out.write(private_key)\n",
    "file_out.close()\n",
    "\n",
    "public_key = key.publickey().export_key()\n",
    "file_out = open(\"receiver.pem\", \"wb\")\n",
    "file_out.write(public_key)\n",
    "file_out.close()\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 71,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Signature: b'bdbed6212cbe2dff18d12029f8f1e3a359d480572bbaec4184b1349f0d6713deed5a89b0765ff79f78c52c4da4c4ebe6291151630d760f05d1c140e81513e678c7a8568fbba14bd18c4696f8e27697bd513a52557181a353a334b81ea007a5370b81a0800d65373e33f3da687ff9a0b22b17dd6d1b62c5e159884f197b45983a'\n",
      "Signature is invalid.\n",
      "Signature is invalid.\n"
     ]
    }
   ],
   "source": [
    "import main \n",
    "from main import privkey\n",
    "# Sign the message using the PKCS#1 v1.5 signature scheme (RSASP1)\n",
    "msg = b'Message for RSA signing'\n",
    "hash = SHA256.new(msg)\n",
    "signer = PKCS115_SigScheme(keyPair)\n",
    "signature = signer.sign(hash)\n",
    "print(\"Signature:\", binascii.hexlify(signature))\n",
    "\n",
    "# Verify valid PKCS#1 v1.5 signature (RSAVP1)\n",
    "msg = b'Message for RSA signing'\n",
    "hash = SHA256.new(msg)\n",
    "verifier = PKCS115_SigScheme(pubKey)\n",
    "try:\n",
    "    verifier.verify(hash, signature)\n",
    "    print(\"Signature is valid.\")\n",
    "except:\n",
    "    print(\"Signature is invalid.\")\n",
    "\n",
    "# Verify invalid PKCS#1 v1.5 signature (RSAVP1)\n",
    "msg = b'A tampered message'\n",
    "hash = SHA256.new(msg)\n",
    "verifier = PKCS115_SigScheme(pubKey)\n",
    "try:\n",
    "    verifier.verify(hash, signature)\n",
    "    print(\"Signature is valid.\")\n",
    "except:\n",
    "    print(\"Signature is invalid.\")"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 62,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "b'74a8fc217cc5017e93692061d50f18f16820565e0fd9659cfc88881cbb14b74ddd68ef00ef6de493501c6cf5b4400d009cfafbc4e29d9a999f05eac691f7ec3130f985522cb5bf9b2256dfd11747942fecd848857590f6dcbde77b160a3872bbd273a48f19b490b130cdc2f250e4069320938910b73f1cef6ecd94ef5145833b'\n"
     ]
    }
   ],
   "source": [
    "print(binascii.hexlify(signature))"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
  }
 ],
 "metadata": {
  "kernelspec": {
   "display_name": "Python 3",
   "language": "python",
   "name": "python3"
  },
  "language_info": {
   "codemirror_mode": {
    "name": "ipython",
    "version": 3
   },
   "file_extension": ".py",
   "mimetype": "text/x-python",
   "name": "python",
   "nbconvert_exporter": "python",
   "pygments_lexer": "ipython3",
   "version": "3.8.3"
  }
 },
 "nbformat": 4,
 "nbformat_minor": 4
}
