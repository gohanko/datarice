copy ./datarice/ ../build/
copy ../.next/standalone/ ../build/datarice/opt/datarice/
copy ../.next/standalone/static/ ../build/datarice/opt/datarice/.next/static
copy ../public/ ../build/datarice/opt/datarice/public/

dpkg-deb --build datarice
