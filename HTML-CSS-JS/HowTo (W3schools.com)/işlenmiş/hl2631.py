# coding:iso-8859-9 Türkçe
# hl2631.py: Dizi liste elemanlarını yegane sözlük süzgeciyle yansıtma örneği.

listem = ["a", "b", "a", "c", "c", "a", "b", "b"]
print ("Listem:", listem, len (listem) )
listem = list (dict.fromkeys (listem) )
print ("Yegane listem:", listem, len (listem) )


"""Çıktı:
>python hl2631.py
Listem: ['a', 'b', 'a', 'c', 'c', 'a', 'b', 'b'] 8
Yegane listem: ['a', 'b', 'c'] 3
"""