{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 103,
   "metadata": {},
   "outputs": [],
   "source": [
    "from Crypto.PublicKey import RSA\n",
    "from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme\n",
    "from Crypto.Hash import SHA256\n",
    "import Crypto.Cipher\n",
    "from Crypto.Cipher import PKCS1_OAEP\n",
    "import binascii\n",
    "import base64\n",
    "import ast\n",
    "import os"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 104,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Signature: b'6caec7ce79b11400c8a9f3e91529881b7b9bd1ce491066e7e6626249251f057bed298bf70eeacb381490ed0005507b97188d8727c7920d9c0ab0564bdc6048f1552d450af7caecd89876d5debe2c76a157b09ae50062bf637ac11060dc2a22429b18dcca2ac7a287778ac79ec60a4ee9c69cbecc0e548fa1217bc3e76ccb4011'\n",
      "Signature is invalid.\n"
     ]
    }
   ],
   "source": [
    "\n",
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
    "    print(\"Signature is invalid.\")"
   ]
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
