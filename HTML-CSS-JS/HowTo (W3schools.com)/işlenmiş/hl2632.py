# coding:iso-8859-9 T�rk�e
# hl2632.py: Dizi liste elemanlar�n� fonksiyonlu yegane s�zl�k s�zgeciyle yans�tma �rne�i.

def fonk (x): return list (dict.fromkeys (x) )
listem = fonk ( ["a", "b", "a", "c", "c", "a", "b", "b"] )

print ("Yegane listem:", listem, len (listem) )


"""��kt�:
>python hl2632.py
Yegane listem: ['a', 'b', 'c'] 3
"""