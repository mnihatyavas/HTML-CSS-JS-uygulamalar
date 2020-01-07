# coding:iso-8859-9 T�rk�e
# hl2631.py: Dizi liste elemanlar�n� yegane s�zl�k s�zgeciyle yans�tma �rne�i.

listem = ["a", "b", "a", "c", "c", "a", "b", "b"]
print ("Listem:", listem, len (listem) )
listem = list (dict.fromkeys (listem) )
print ("Yegane listem:", listem, len (listem) )


"""��kt�:
>python hl2631.py
Listem: ['a', 'b', 'a', 'c', 'c', 'a', 'b', 'b'] 8
Yegane listem: ['a', 'b', 'c'] 3
"""