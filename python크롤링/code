from urllib.request import urlopen
from bs4 import BeautifulSoup
import re

html = urlopen("https://www.dog-zzang.co.kr/dog_sale/know_how1.php?page=1&keyfield=&key=")  

bsObject = BeautifulSoup(html, "html.parser") 
for link in bsObject.find_all('a'):
    s=link.text.strip()
    hangul = re.compile('[^ ㄱ-ㅣ가-힣]+') # 한글과 띄어쓰기를 제외한 모든 글자
    # hangul = re.compile('[^ \u3131-\u3163\uac00-\ud7a3]+')  # 위와 동일
    result = hangul.sub('', s) # 한글과 띄어쓰기를 제외한 모든 부분을 제거
    text = result.lstrip()
    print (text)
    #lstrip - 왼쪽에 있는 공백 제거
    #rstrip - 오른쪽에 있는 공백 제거 
    #strip - 왼쪽 오른쪽에 있는 공백 제거 
    #공백 전체 제거 text = "    what are you doing? " / text1 = text.replace(" ","") / print(text1)
