{
 "cells": [
  {
   "cell_type": "code",
   "execution_count": 25,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Private RSA key at 0x7FAC3531A850\n"
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
    "# Generate 1024-bit RSA key pair (private + public key)\n",
    "keyPair = RSA.generate(bits=1024)\n",
    "pubKey = keyPair.publickey()\n",
    "\n",
    "# Encrypt keys\n",
    "text= b'encrypting'\n",
    "encryptor = PKCS1_OAEP.new(pubKey)\n",
    "encrypted = encryptor.encrypt(text)\n",
    "print(keyPair)"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 24,
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
   "execution_count": 19,
   "metadata": {},
   "outputs": [
    {
     "name": "stdout",
     "output_type": "stream",
     "text": [
      "Signature: b'318668084349c5a2fca31b0a3fac8b109928e74feb4ad402b44754a19bae2218b11c43f96d87d29ce428c3fc9d5f0ca5a31123d378c1465020a22c3cabcde5b6565c725cef00e7f40f30dd164f665611707e83b1ccae0dcc44b5751fa7347f32c06053ccb1c99fb8d35759d244662698d12b3a1e1364140d49b67339b3e6a6b1'\n",
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
   "execution_count": 27,
   "metadata": {},
   "outputs": [],
   "source": [
    "\n",
    "\n"
   ]
  },
  {
   "cell_type": "code",
   "execution_count": 29,
   "metadata": {},
   "outputs": [
    {
     "ename": "NameError",
     "evalue": "name 'DataModel' is not defined",
     "output_type": "error",
     "traceback": [
      "\u001b[0;31m---------------------------------------------------------------------------\u001b[0m",
      "\u001b[0;31mNameError\u001b[0m                                 Traceback (most recent call last)",
      "\u001b[0;32m<ipython-input-29-c300f96e45c8>\u001b[0m in \u001b[0;36m<module>\u001b[0;34m\u001b[0m\n\u001b[1;32m      1\u001b[0m \u001b[0mapp\u001b[0m \u001b[0;34m=\u001b[0m \u001b[0mFastAPI\u001b[0m\u001b[0;34m(\u001b[0m\u001b[0;34m)\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[0;32m----> 2\u001b[0;31m \u001b[0mdm\u001b[0m \u001b[0;34m=\u001b[0m \u001b[0mDataModel\u001b[0m\u001b[0;34m(\u001b[0m\u001b[0;34m)\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[0m\u001b[1;32m      3\u001b[0m \u001b[0;34m\u001b[0m\u001b[0m\n\u001b[1;32m      4\u001b[0m \u001b[0;34m@\u001b[0m\u001b[0mapp\u001b[0m\u001b[0;34m.\u001b[0m\u001b[0mget\u001b[0m\u001b[0;34m(\u001b[0m\u001b[0;34m\"/\"\u001b[0m\u001b[0;34m)\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n\u001b[1;32m      5\u001b[0m \u001b[0;32masync\u001b[0m \u001b[0;32mdef\u001b[0m \u001b[0mroot\u001b[0m\u001b[0;34m(\u001b[0m\u001b[0;34m)\u001b[0m\u001b[0;34m:\u001b[0m\u001b[0;34m\u001b[0m\u001b[0;34m\u001b[0m\u001b[0m\n",
      "\u001b[0;31mNameError\u001b[0m: name 'DataModel' is not defined"
     ]
    }
   ],
   "source": [
    "import os\n",
    "\n",
    "import numpy as np\n",
    "import pandas as pd\n",
    "from dotenv import load_dotenv\n",
    "from pmdarima.arima import auto_arima\n",
    "from statsmodels.tsa.stattools import adfuller\n",
    "from statsmodels.tsa.arima_model import ARIMAimport warnings\n",
    "\n",
    "warnings.filterwarnings(\"ignore\")\n",
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
