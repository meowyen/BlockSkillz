{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 40,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "b'-----BEGIN RSA PRIVATE KEY-----\\nMIICXAIBAAKBgQDomhy4Yz4fb/lUiCydVFku66NPXs506sUmA/WlCoLMeyD25ISz\\n23dj0Gopg45zee58RdmEIrOPQR8H1dDXEKKHGyCVlYADOoOT8FpGcDMtz/6PyKje\\n+vGUtB0CXKVAR/JPO0y0bER1pHe+i3wFBmdwILvRsmlOHPGCDpfULU103wIDAQAB\\nAoGABnHYBYnbu55BdRn4IScoThhW+YjXGpPeANwk5GeX+9drheZgq4+99++F3tRC\\nJalFYNRvSZh2i4ESkt0rQKeO1oxK90MSBWTjwbOt4HZFbstPRGX1Wcvv8hw8PA+Q\\ntkzUzPty/jatEsCec134V0iDG7jfiyS/nnN/ybUNJ2m00hECQQDzcY6pYpQibxJB\\nfxowh7eNj69w2iLwSZdfQFYAQffFSyaBan/Lir4NQEuvxEGd/ydd/sVWNhQThX2Q\\ntU59htSPAkEA9Jlm7Q/bkaHmEkLMXCm5x3zx+x+rV3UQmNZVl1OtPGf6eOT0jRao\\nbne3CMd+fQGLtNB0Vxx6GLVSmFCoY06isQJAJ5JU60m/5J0DbawYeL0G5DbwALsk\\npMSBm5UcpawTd3mQx8alAVQLMqI561dOhz07i/bm4u2lc8rmL0iZeqQZFwJBALZh\\nE2+7nTpPf18qU3p82js2nK9kg7uoXAG5/wPgrpEV7prqDLaOqHQF64IuTdAjsOnX\\nbIfvgdKekMFlksjJP2ECQDpxYW6gPBmAUca9VGocIMbERGQ3rzx8gSDQnQ5Gn+OS\\nVPGQivGPi9EqnVhgvyNK+crpyAzA143fUeR0jn4YF5E=\\n-----END RSA PRIVATE KEY-----'\n"
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
    "import numpy as np\n",
    "import pandas as pd\n",
    "from dotenv import load_dotenv\n",
    "\n",
    "# Generate 1024-bit RSA key pair (private + public key)\n",
    "keyPair = RSA.generate(bits=1024)\n",
    "pubKey = keyPair.publickey().exportKey(\"PEM\") \n",
    "\n",
    "privkey = keyPair.exportKey(\"PEM\")\n",
    "\n",
    "# Encrypt keys\n",
    "#text= b'encrypting'\n",
    "#encryptor = PKCS1_OAEP.new(pubKey)\n",
    "#encrypted = encryptor.encrypt(text)\n",
    "print(privkey)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 34,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "b'encrypting'\n"
     ]
    }
   ],
   "source": [
    "decryptor = PKCS1_OAEP.new(keyPair)\n",
    "decrypted = decryptor.decrypt(ast.literal_eval(str(encrypted)))\n",
    "print(decrypted)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 35,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Signature: b'26a5e0ee2dbfe3050ca72c04564fc0ae89ad5ffd33175c15d48f14d647ee1d212cf722fe1e15bcdae575b10d655d0f58aabaa8a75b69888fb87a3403eab3dd898485514c780ccf4794f14cf7c66a75acad5e8318a0ea91bbab5b3fb10cf8b92201f9ed6187d0e2b2e2b385f56811adc4c97a9c9ab8957258a4e046b6fe047c45'\n",
      "Signature is valid.\n",
      "Signature is invalid.\n"
     ]
    }
   ],
   "source": [
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
    "    print(\"Signature is invalid.\")\n",
    "    "
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 36,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "\n",
    "\n",
    "class DataModel:\n",
    "\n",
    "    def __init__(self):\n",
    "        \"\"\"\n",
    "        Initialize with Alpaca client with API keys.\n",
    "        \"\"\"\n",
    "        load_dotenv()\n",
    "        api_key = os.getenv(\"ALPACA_API_KEY\")\n",
    "        secret_key = os.getenv(\"ALPACA_SECRET_KEY\")\n",
    "        self.api = tradeapi.REST(\n",
    "            api_key,\n",
    "            secret_key,\n",
    "            api_version=\"v2\"\n",
    "        )\n",
    "\n",
    "    def get_ticker_data(self, ticker):\n",
    "        \"\"\"\n",
    "        Returns ticker data from Alpaca.\n",
    "        \"\"\"\n",
    "        timeframe = \"1D\"\n",
    "        max_iter = 1000\n",
    "        barset = self.api.get_barset(\n",
    "            ticker,\n",
    "            timeframe,\n",
    "            limit=max_iter\n",
    "        ).df\n",
    "\n",
    "        return barset[ticker][\"close\"]\n",
    "\n",
    "    def test_stationarity(self, data):\n",
    "        \"\"\"\n",
    "        Test for stationary data and return p-value.\n",
    "        \"\"\"\n",
    "        adft = adfuller(data, autolag=\"AIC\")\n",
    "        p_value = adft[1]\n",
    "\n",
    "        return p_value\n",
    "\n",
    "    def p_value_test(self, data, p_value):\n",
    "        \"\"\"\n",
    "        Runs ARIMA and returns results.\n",
    "        \"\"\"\n",
    "        data_df = data\n",
    "\n",
    "        if p_value >= 0.05:\n",
    "            data_df = np.log(data)\n",
    "\n",
    "        train_data, test_data = data_df[3:int(\n",
    "            len(data_df)*0.9)], data_df[int(len(data_df)*0.9):]\n",
    "\n",
    "        model_autoARIMA = auto_arima(train_data, start_p=0, start_q=0, test='adf', max_p=3, max_q=3, m=1, d=None,\n",
    "                                     seasonal=False, start_P=0, D=0, trace=True, error_action='ignore', suppress_warnings=True, stepwise=True)\n",
    "\n",
    "        model = ARIMA(train_data, order=(\n",
    "            model_autoARIMA.order[0], model_autoARIMA.order[1], model_autoARIMA.order[2]))\n",
    "        fitted = model.fit(disp=-1)\n",
    "\n",
    "        # forecast\n",
    "        fc, se, conf = fitted.forecast(100, alpha=0.05)  # 95% confidence\n",
    "        fc_series = pd.Series(fc, index=test_data.index)\n",
    "\n",
    "        mape = np.mean(np.abs(fc - test_data)/np.abs(test_data))\n",
    "\n",
    "        return mape, fc_series\n",
    "\n",
    "    def up_or_down(self, fc_series):\n",
    "        \"\"\"\n",
    "        Returns whether the stock will go UP or DOWN based on ARIMA results.\n",
    "        \"\"\"\n",
    "        if fc_series[-1] > fc_series[0]:\n",
    "            return \"UP\"\n",
    "        else:\n",
    "            return \"DOWN\"\n",
    "\n",
    "    def get_forecast(self, ticker):\n",
    "        \"\"\"\n",
    "        Returns the forecast for the specified ticker.\n",
    "        \"\"\"\n",
    "        data_df = self.get_ticker_data(ticker)\n",
    "        p_value = self.test_stationarity(data_df)\n",
    "        mape, fc_series = self.p_value_test(data_df, p_value)\n",
    "        result = self.up_or_down(fc_series)\n",
    "\n",
    "        return result, mape"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": null,
   "metadata": {},
   "outputs": [],
   "source": []
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
