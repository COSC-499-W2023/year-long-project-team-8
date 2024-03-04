@echo off

cd config
python update_config.py
cd ..
npx expo start
