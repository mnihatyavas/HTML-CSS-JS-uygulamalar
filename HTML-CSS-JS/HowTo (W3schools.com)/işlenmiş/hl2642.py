# coding:iso-8859-9 Türkçe
# hl2642.py: Verili bir dizgeyi fonksiyonla tersine çevirme örneği.

def fonk (x): return x [::-1]

dizgem = "Bu metnin tersten yazılışını çok merak ediyorum!.."

print ("Dizgem:", dizgem)
print ("Ters dizgem:", fonk (dizgem) )


"""Çıktı:
>python hl2642.py
Dizgem: Bu metnin tersten yazılışını çok merak ediyorum!..
Ters dizgem: ..!muroyide karem koç ınışılızay netsret nintem uB
"""