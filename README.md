# ShoptetApi-neoship-zadanie

## O čom bolo zadanie
Zadanie slúži na napojenie na rozhranie Shoptet Api pomocou prístupových tokenov, ktoré mi sprístupnila firma Neoship.
Je to nedokončený doplnok Shoptetu, ktorý slúži na importovanie objednávok z Shoptet e-shopu, následné vypísanie a editáciu vybraných objednávok.

## Ako funguje
1. Po otvorení sa mi zobrazí výber dátumov od do, aby som si určil od kedy do kedy mám importovať objednávky daného e-shopu.  
2. Zavolanie koncového boda Shoptet API na výpis objednávok podľa zadaného dátumu a označovanie, ktoré chcem editovať.  
3. Zavolanie ďalšieho koncového boda Shoptet API na výpis detailov objednávok, ktoré následne môžem upraviť.
4. Po kliknutí na tlačidlo import dané upravené objednévky vypíše do konzole. (malo to slúžiť na import objednávok do rozhrania Neoship)

## V čom som to robil
Zadanie som robil pomocou Symfony, React, Material UI, Typescript, mierne CSS, OOP PHP a HTML.
Toto bol môj prvý dotyk s technológiami Symfony, React, Material UI.

## Upozornenie
Zadanie momentálne nefunguje úplne ako by malo, pretože v mojom zadaní už nemám sprístupnené údaje o doplnku, koncových bodoch,
prístup na Shoptet testovací e-shop atď.

## Foto doplnku kým som mal údaje
1. Domovná stránka
![1](https://user-images.githubusercontent.com/76968011/129552183-c26b398c-8421-4f08-ac00-3d73974cb7b8.png)
2. Po vypísaní objednávok
![2](https://user-images.githubusercontent.com/76968011/129552318-7110397c-fd51-4f3b-87bb-3f27094309d2.png)
3. Po označení objednávok
![3](https://user-images.githubusercontent.com/76968011/129552387-1c42ef5e-16d9-40bd-a78c-d7f61f01c0dd.png)
4. Následná úprava označených objednávok
![4](https://user-images.githubusercontent.com/76968011/129552456-a6933e9f-8f32-443d-a4c8-ef01c7a84c27.png)
5. Výsledok
![5](https://user-images.githubusercontent.com/76968011/129552564-0e042eab-59ec-4a60-9afd-c0346002fafd.png)




