W użytej architekturze primitives jest miejscem na atomy, czyli reużywalne np. <Button> z variantami type="primary", które są używane w większych alementach jak ui albo domain, aby ustandaryzować projekt.

Opcjonalnie można użyć gotowej biblioteki komponentów, wtedy primitives jest zbędne i struktura wypłaszcza się z

src
  - components
    - primitives
    - ui
  - domain

do

src
  - ui (lub components)
  - domain