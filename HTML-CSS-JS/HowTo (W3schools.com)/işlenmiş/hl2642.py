# coding:iso-8859-9 T�rk�e
# hl2642.py: Verili bir dizgeyi fonksiyonla tersine �evirme �rne�i.

def fonk (x): return x [::-1]

dizgem = "Bu metnin tersten yaz�l���n� �ok merak ediyorum!.."

print ("Dizgem:", dizgem)
print ("Ters dizgem:", fonk (dizgem) )


"""��kt�:
>python hl2642.py
Dizgem: Bu metnin tersten yaz�l���n� �ok merak ediyorum!..
Ters dizgem: ..!muroyide karem ko� �n���l�zay netsret nintem uB
"""