electron-installer-squirrel-windows

electron-packager . Conges --platform=win32 --arch=x64 --icon=./conges.ico --out=Staging --version-string.CompanyName=UdL --version-string.ProductName=Conges --version-string.ProductVersion=1.0 --overwrite

~~~
brew install wine
npm install
bower install
npm run build
codesign --force --sign "Université de Lyon" -v /Users/vincent/Desktop/conges/dist/conges-darwin
-x64/conges.app
~~~
signcode -spc ~/Nuxeo\ Drive\ UDL/Vincent\ Lombard/UDL/admin/code_sign.spc -pvk ~/Nuxeo\ Drive\ UDL/Vincent\ Lombard/UDL/admin/code_sign.pvk.txt -n "Conges" dist/win/conges\ Setup\ 1.0.0.exe
