# coding:iso-8859-9 Türkçe
# hl2632.py: Dizi liste elemanlarını fonksiyonlu yegane sözlük süzgeciyle yansıtma örneği.

def fonk (x): return list (dict.fromkeys (x) )
listem = fonk ( ["a", "b", "a", "c", "c", "a", "b", "b"] )

print ("Yegane listem:", listem, len (listem) )


"""Çıktı:
>python hl2632.py
Yegane listem: ['a', 'b', 'c'] 3
"""