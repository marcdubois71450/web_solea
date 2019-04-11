
date=$(date +%s)



json="{\"$date\":\"date\"}"
echo $json

curl -s -X PATCH -d "$json" \https://websolea.firebaseio.com/asterisk.json?auth=a9Iunu114EQArvYfBTO1pC4XpVnlSIY49TU7QUnK
