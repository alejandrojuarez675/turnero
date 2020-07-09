now=$(date)
echo borrando archivos anteriores...
cd ../turnero-demo/
rm -R assets
cd ../turnero-hospital-espaniol/turnero-hospital-espaniol/
echo compilando...
ng build --prod --base-href turnero-demo
echo compilacion completa
cd dist/turnero-hospital-espaniol/
mv * ../../../../turnero-demo/
cd ../../../../turnero-demo/
sed -i 's+../../../assets+./assets+g' main.js
echo publicando demo en github
git pull
git add .
git commit -m "commit automatico - ${now}"
git push
