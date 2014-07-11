/*jslint sloppy: true, indent: 2 */
/*global XMLHttpRequest */

(function (global) {
  "use strict";

  global.onerror = (function () {
    var sent = {};
    return function (message, filename, lineno, colno, error) {
      message = String(message || "");
      filename = String(filename || "");
      lineno = String(lineno || "");
      colno = String(colno || "");
      if ("\v" === "v") {
        return;
      }
      if (message === "Script error.") {
        return;
      }
      var stack = error ? String(error.stack || "") : "";
      var data = "message=" + encodeURIComponent(message) + "&" +
                 "filename=" + encodeURIComponent(filename) + "&" +
                 "lineno=" + encodeURIComponent(lineno) + "&" +
                 "colno=" + encodeURIComponent(colno) + "&" +
                 "stack=" + encodeURIComponent(stack);
      if (!sent[data]) {
        sent[data] = true;
        var xhr = new XMLHttpRequest();
        xhr.open("POST.html", "jserrors8d57.html?error=1", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(data);
      }
    };
  }());

}(this));

/*jslint plusplus: true, vars: true, indent: 2 */
/*global document */

/*
  element.classList for (IE8+)

  Object.defineProperty with DOM
*/

(function (E) {

  "use strict";

  function ClassList(element) {
    this.element = element;
  }

  ClassList.prototype = {
    contains: function (className) {
      className = String(className);
      var element = this.element;
      var x = (" " + element.className + " ").replace(/\s+/g, " ");
      return x.indexOf(" " + className + " ") !== -1;
    },
    add: function (className) {
      className = String(className);
      var element = this.element;
      var x = (" " + element.className + " ").replace(/\s+/g, " ");
      if (x.indexOf(" " + className + " ") === -1) {
        element.className = x + className;
      }
    },
    remove: function (className) {
      className = String(className);
      var element = this.element;
      var x = (" " + element.className + " ").replace(/\s+/g, " ");
      element.className = x.split(" " + className + " ").join(" ");
    },
    toggle: function (className) {
      className = String(className);
      var element = this.element;
      var x = (" " + element.className + " ").replace(/\s+/g, " ");
      if (x.indexOf(" " + className + " ") === -1) {
        element.className = x + className;
      } else {
        element.className = x.split(" " + className + " ").join(" ");
      }
    }
  };

  var getter = function () {
    return new ClassList(this);
  };

  if (E && !("classList" in document.documentElement)) {
    if (Object.defineProperty) {
      Object.defineProperty(E.prototype, "classList", {
        get: getter,
        configurable: true, /* IE8-9 bug */
        enumerable: false
      });
    } else if (E.prototype.__defineGetter__) {
      E.prototype.__defineGetter__("classList", getter);
    }
  }

}(this.HTMLElement || this.Element));

/*jslint plusplus: true, vars: true, indent: 2 */
/*global document*/

// https://bugzilla.mozilla.org/show_bug.cgi?id=687787

(function () {
  "use strict";

  var custom = false;

  function simulateFocusInOut(event) {
    // CustomEvent is not supported under FF < 6
    var e = document.createEvent("Event");
    e.initEvent(event.type === "focus" ? "focusin" : "focusout", true, false);
    custom = true;
    event.target.dispatchEvent(e);
  }

  function off(event) {
    if (!custom) {
      // to prevent firing of native "focusin"/"focusout"
      event.stopPropagation();
    }
    custom = false;
  }

  if ("\v" !== "v" && document.addEventListener) {
    document.addEventListener("focus", simulateFocusInOut, true);
    document.addEventListener("blur", simulateFocusInOut, true);
    document.addEventListener("focusin", off, true);
    document.addEventListener("focusout", off, true);
  }

}());

(function () {
  "use strict";

  // shim for http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  // https://code.google.com/p/chromium/issues/detail?id=122652
  // https://bugzilla.mozilla.org/show_bug.cgi?id=421933

  document.addEventListener("keydown", function (event) {
    if (event.keyCode !== 13 || event.ctrlKey || event.altKey || event.shiftKey || event.metaKey ||
        event.defaultPrevented || (event.getPreventDefault && event.getPreventDefault())) {
      return;
    }
    var target = event.target;
    if (target.getAttribute("tabindex")) {
      event.preventDefault();
      target.click();
    }
  }, false);

}());

/*jslint plusplus: true, regexp: true, vars: true, white: true */
/*global document*/

/*
  see style.css
*/

(function () {
  "use strict";
  // .details/.summary
  document.addEventListener("click", function (event) {
    var target = event.target;
    while (target && !(target.classList && target.classList.contains("summary") && target.parentNode && target.parentNode.classList && target.parentNode.classList.contains("details"))) {
      target = target.parentNode;
    }
    if (target !== null) {
      var summary = target;
      var details = target.parentNode;
      event.preventDefault();
      details.classList.toggle("open");
      summary.focus();
      var e = document.createEvent("Event");
      e.initEvent("toggle", false, false);
      details.dispatchEvent(e);
    }
  }, false);
}());

/*jslint plusplus: true, vars: true, indent: 2 */

var i18n = {
  multi: {
    samples0: "<code>1/23</code> , <code>12.45</code> , <code>-1.3(56)</code> , <code>1.2e-4</code>",
    samples1: "<code>2/3+3*(10-4)</code>, <code>(1+x)/y^2</code>, <code>2^0.5</code>",
    bg: "български",
    de: "deutsch",
    es: "español",
    en: "english",
    ru: "русский",
    pt: "português",
    it: "italiano"
  },
  de: {
    externalLinks: "",
    close: "Schließen",

    matrixOperations: "Operationen mit Matrizen",
    solvingSystemsOfLinearEquations: "Lösen des linearen Gleichungssystems",
    determinantCalculation: "Definieren der Determinante",
    examples: "Beispiele für Lösungen",
    eigenvalues: "Bestimmung von Eigenvektoren",
    wikiLink: "http://de.wikipedia.org/wiki/Matrix_(Mathematik)",
    wiki: "Erforderliche Theorie",
    matrix: "Matrix",
    cells: "Zellen",
    clear: "löschen",
    advices: "<li>Verlassen <i>Extrazellen leer</i> um nichtquadratische Matrizen einzugeben</li><li>Matrixelemente - Dezimalbrüche (endliche und periodische) Brüche: ${samples0}; oder arithmetische Ausdrücke: ${samples1}</li><li>Verwenden <i>Enter-Taste</i>, <i>Leertaste</i>, <i>Pfeiltaste</i> um sich durch Zellen zu bewegen</li><li>Kopieren Matrizen vom Ergebnis (drag and drop), oder auch vom Text-Editor</li><li>Theorie finden Sie auf Seute <a href=\"http://de.wikipedia.org/wiki/Matrix_(Mathematik)\" target=\"_blank\" title=\"Theorie: Operationen mit Matrizen\">Wikipedia</a>.</li>",
    displayDecimal: "Den Dezimalbruch ausgeben",
    numberOfDecimalPlaces: "die Anzahl der Stellen nach dem Komma",
    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "Determinante: 0! - Kehrmatrix existiert nicht",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "Die Anzahl der Spalten der ersten Matrix muss der Anzahl der Zeilen der zweiten Matrix gleich sein!",
    matricesShouldHaveSameDimensions: "Die Größe der Matrizen soll gleich sein!",
    summaryLabel: "Details",
    text11: "1) Wir finden die Eigenwerte der charakteristischen Gleichung: ",
    text12: "dann haben wir ein LGS, lösen es durch Gauß-Verfahran:",
    text13: "2)Für jedes &lambda; berechnen den Eigenvektor:<br>",
    text14: "Keine rationale Lösungen.",
    textAnalyseCompatibility: "Analysieren das System auf Kompatibilität.",
    textAn1a: "Rang der erweiterten Matrix ist gleich dem Rang des Systems und der Anzahl der Unbekannten=> Das System ist konsistent und hat eine einzige Lösung.",
    textAn1b: "Rang der erweiterten Matrix ist gleich dem Rang des Systems, aber weniger als die Anzahl der Unbekannten => Das System ist konsistent und hat unendlich viele Lösungen.",
    textAn2: "Rang der erweiterten Matrix des Systems ist nicht gleich dem Rang der Matrix des Systems => Das System ist inkonsistent (keine Lösungen).",
    text01: "Zum Lösen mit Cramer-Verfahren muss die Anzahl der Gleichungen der Anzahl der Unbekannten gleich sein!",
    text02: "Zum Lösen mit Cramer-Verfahren muss Determinante des Systems nicht Null sein!",
    //text03: "Füllen Sie bitte die Spalte auf der rechten Seite richtig aus",
    text04: "Lösen mit dem Cramer-Verfahren:",
    text05: "Zum Lösen mit der Kehrmatrix muss die Anzahl der Gleichungen der Anzahl der Unbekannten gleich sein!",
    text06: "Zum Lösen mit der Kehrmatrix muss Determinante des Systems nicht Null sein!",
    text08: "Lösen mit der Kehrmatrix",
    textAnswer: "Ergebnis:",
    //text50: "Überprüfen Sie bitte, ob die Matrizen richtig ausgefüllt sind (Vergessen Sie nicht, die rechte Spalte auszufüllen)",
    text51: "Lösen mit dem Gauß-Verfahren</h4>Erweiterte Matrix des Systems:",
    text52: "Keine Lösungen.",
    text53: "Allgemeine Lösung:",
    textInsertin: "Einfügen in",
    textClear: "Löschen",
    textFundamentalSystem: "Fundamentales Lösungssystem",
    textBasicSolutions: "Basislösungen",
    inputError: "Fehler, überprüfen Sie bitte Ihre Eingaben (man kann die Zahlen in der Form 1/23; 12.45; -1.3(56); 1.2e-4; 2/3+3*(10-4); (1+x)/y^2) eingeben)",
    matrixIsNotSquare: "Nichtquadratische Matrix",
    divisionByZeroError: "Division durch Null",
    exponentIsNegative: "In die negative Potenz erheben",
    or: "oder",
    showText: "In Text konvertieren",
    showMathML: "Zeigen MathML",
    showImage: "Als Bild zeigen",
    showComments: "Kommentare",
    tweet: "Tweet",
    notEnoughRationalEigenvalues: "Nicht genug rational Eigenwerte",
    indexTitle: "Matrizenrechner",
    indexDescription: "Addieren, Multiplizieren, Matrizenumkehrung, Berechnung,der Determinante und Rang, transponieren, Reduktion auf Diagonalform und dreieckige Form , Lösen des linearen Gleichungssystems",
    swapMatrices: "Tauschen A und B",
    multiplyMatrices: "Matrizen multiplizieren",
    addMatrices: " Matrizen addieren",
    subtractBFromA: " Matrizen subtrahieren",
    indexIntro1: "Mit diesem Rechner können Sie: Deteminante, ihren Rang berechnen, potenzieren, Kehrmatrix, Matrizensumme und Produkt berechnen. Geben Sie in die Felder für die Matrixelemente ein und klicken Sie auf die entsprechende Taste.",
    findDeterminant: "Determinante definieren",
    findInverse: "Berechnen Kehrmatrix",
    findTranspose: "Transponieren",
    findRank: "Den Rang berechnen",
    multiplyBy: "Multiplizieren mit",
    triangularMatrix: "Dreieckige Form",
    diagonalMatrix: "Diagonale Form",
    exponentiation: "In die Potenz erheben",
    sluDescription: "Lösen des linearen Gleichungssystems (Matrixverfahren, Gauß-Berfahren), auf Kompatibilität analysieren",
    sluHeader: "Lösen des linearen Gleichungssystems",
    sluIntro: "<p>Diese Seite soll Ihnen helfen lineares Gleichungssystem auf Kompatibilität zu analysieren (<a hreflang=\"en\" href=\"http://en.wikipedia.org/wiki/Rouch%C3%A9%E2%80%93Capelli_theorem\">Rouché–Capelli theorem</a>), die Anzahl der Lösungen zu bestimmen, lineares Gleichungssystem (LGS) mit dem <a href=\"http://de.wikipedia.org/wiki/Gau%C3%9Fsches_Eliminationsverfahren\">Gauß-Verfahren</a> , der Kehrmatrix oder dem <a href=\"http://de.wikipedia.org/wiki/Cramersche_Regel\">Cramer-Verfahren</a> zu lösen, Gesamtlösung, partikuläre Lösung und Basislösung zu finden.Geben Sie in das Eingabefeld die Koeffizienten der Unbekannten ein.Wenn Ihre Gleichung hat weniger Anzahl der Unbekannten, lassen Sie die Eingabefelder der Variablen, die nicht Teil Ihrer Gleichung sind, leer. Da kann man Brüche eingeben (13/31). Weitere Information finden Sie unter <a href=\"http://de.wikipedia.org/wiki/Lineares_Gleichungssystem\">Lineares Gleichungssystem.</a></p>",
    sluTitle: "Lösung des linearen Gleichungssystemes (LGS) online",
    testForConsistency: "auf Kompatibilität analysieren",
    solveByKrammer: "Mit dem Cramer-Verfahren lösen",
    solveByInverse: "Mit der Kehrmatrix lösen",
    solveByGauss: "Mit dem Gauß-Verfahren lösen",
    solveByJordanGauss: "Mit dem Gauß-Jordan-Verfahren lösen",
    detTitle: "Determinante definieren",
    detDescription: "Rechner für Determinante",
    detHeader: "Determinante definieren",
    detIntro: "<p> Auf dieser Seite können Sie <a href=\"http://de.wikipedia.org/wiki/Determinante\">Determinante</a> durch Aufteilung in der Zeile oder der Spalte oder durch Erfassen der Nullen in der Zeile oder der Spalte berechnen. Die Determinante wird mit der Zwischenausgabe berechnet.",
    expandBy: "Aufteilen in",
    column: "Spalte",
    row: "Zeile",
    obtainZerosIn: "Auf Null setzen",
    column2: "Spalte",
    vectorsTitle: "Die Eigenvektoren und Eigenwerte",
    vectorsDescription: "Rechner für Eigenvektoren und Eigenwerte",
    vectorsHeader: "Bestimmung von Eigenwerten Eigenvektoren",
    vectorsIntro: "Mit diesem Rechner können Sie: Eigenvektoren und Eigenwerte mit der charakteristischen Gleichung berechnen.",
    vectorsFind: "Berechnen"
  },
  ru: {
    /* unsorted */
    showExampleOfSystemInput: "Показать пример ввода системы:",

    externalLinks: " <a rel=\"external\" hreflang=\"ru\" href=\"http://market.linagold.ru\">Интернет-магазин Постельного белья</a>, <a rel=\"external\" href=\"http://stopudov.pro\">Сто пудов рыболов</a>",
    close: "Закрыть",

    /* navigation */
    matrixOperations: "Операции с матрицами",
    solvingSystemsOfLinearEquations: "Решение систем линейных уравнений",
    determinantCalculation: "Нахождение определителя",
    examples: "Примеры решений",
    eigenvalues: "Нахождение собственных векторов",
    wikiLink: "http://ru.wikipedia.org/wiki/Матрица_(математика)",
    wiki: "Необходимая Теория",

    /* common */
    matrix: "Матрица",
    cells: "ячейки",
    clear: "очистить",
    advices: "" +
"<ul>" +
"<li>оставляйте лишние ячейки <i>пустыми</i> для ввода неквадратных матриц</li>" +
"<li>элементы матриц - десятичные (конечные и периодические) дроби: ${samples0} ; либо арифметические выражения: ${samples1}</li>" +
"<li>используйте <kbd>ввод</kbd>, <kbd>пробел</kbd>, <kbd>клавиши-стрелки</kbd> для перемещения по ячейкам</li>" +
"<li>перетаскивайте матрицы из результата (drag-and-drop), или даже из текстового редактора</li>" +
"<li>за теорией о матрицах и операциях над ними обращайтесь к страничке на <a href=\"http://ru.wikipedia.org/wiki/Матрица_(математика)\" title=\"Матрицы, Операции над матрицами\">ВикипедиИ</a>.</li>" +
"</ul>",
    displayDecimal: "Выводить десятичную дробь",
    numberOfDecimalPlaces: "число знаков после запятой",

    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "Определитель матрицы равен нулю, обратная матрица не существует.",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "Количество столбцов первой матрицы должно равняться количеству строк второй.",
    matricesShouldHaveSameDimensions: "Размеры матриц должны быть одинаковыми.",
    summaryLabel: "Подробности",

    // vectors.js
    text11: "1) Найдем собственные числа из характеристического уравнения:",
    text12: "Тогда имеем ОСЛУ, решим ее методом Гаусса:",
    text13: "2) Для каждого &lambda; найдем его собственный вектор:",
    text14: "Нет рациональных решений.",

    // slu.js
    textAnalyseCompatibility: "Исследуем систему на совместность.",
    textAn1a: "Ранг расшеренной матрицы равен рангу матрицы системы и равен числу неизвестных => система совместна и имеет единственное решение.",
    textAn1b: "Ранг расшеренной матрицы равен рангу матрицы системы, но меньше числа неизвестных => система совместна и имеет бесконечно много решений.",
    textAn2: "Ранг расширенной матрицы системы не равен рангу матрицы системы => система несовместна (не имеет решений).",

    text01: "Для решения методом Крамера кол-во уравнений должно быть равно числу неизвестных.",
    text02: "Для решения методом Крамера определитель матрицы системы не должен равняться нулю.",
    //text03: "Пожалуйста, правильно заполните столбец правых частей",
    text04: "Решение методом Крамера:",
    text05: "Для решения методом Обратной матрицы кол-во уравнений должно быть равно числу неизвестных.",
    text06: "Для решения методом Обратной матрицы определитель матрицы системы не должен равняться нулю.",
    text08: "Решение методом Обратной матрицы",
    textAnswer: "Ответ:",

    //text50: "Пожалуйста, проверьте правильно ли заполнены матрицы (не забывайте заполнить правый столбец)",
    text51: "<h4>Решение методом Гаусса</h4>Расширенная матрица системы:",
    text52: "Нет решений.",
    text53: "Общее решение:",

    textInsertin: "вставить в",
    textClear: "стереть",
    textFundamentalSystem: "Фундаментальная система решений",
    textBasicSolutions: "Базисные решения",
    inputError: "Ошибка, пожалуйста проверьте введенные данные (вводить можно числа вида: 1/23; 12.45; -1.3(56); 1.2e-4; 2/3+3*(10-4); (1+x)/y^2)",

    matrixIsNotSquare: "Матрица не квадратная",
    divisionByZeroError: "Деление на ноль",
    exponentIsNegative: "Попытка возвести в отрицательную степень",
    or: "или",

    showText: "Показать в текстовом виде",
    showMathML: "Показать MathML",
    showImage: "Показать картинкой",

    showComments: "Комментарии",
    tweet: "Твитнуть",
    notEnoughRationalEigenvalues: "Не достаточно рациональных собственных чисел",

    /* index.html */
    indexTitle: "Матричный калькулятор",
    indexDescription: "Сложение, умножение, обращение матриц, вычисление определителя и ранга, транспонирование, приведение к диагональному, треугольному виду, возведение в степень",
    swapMatrices: "Поменять A и B",
    multiplyMatrices: "Перемножить матрицы",
    addMatrices: "Сложить матрицы",
    subtractBFromA: "Вычесть матрицы",
    indexIntro1: "С помощью этого калькулятора вы сможете: получить определитель матрицы, её ранг, возводить её в степень, найти сумму и произведение матриц, вычислить обратную матрицу. Заполните поля для элементов матрицы и нажмите соответствующую кнопку.",

    findDeterminant: "найти определитель",
    findInverse: "найти обратную",
    findTranspose: "транспонировать",
    findRank: "найти ранг",
    multiplyBy: "умножить на",
    triangularMatrix: "треугольный вид", /* должно быть: привести к треугольному виду (сокращено) */
    diagonalMatrix: "диагональный вид", /* должно быть: привести к диагональному виду (сокращено) */
    exponentiation: "возвести в степень",

    /* slu.html */
    sluDescription: "Решение систем линейных уравнений (матричный метод, метод Гаусса), исследование на совместность",
    sluHeader: "Решение систем линейных уравнений",
    sluIntro: "Эта страничка поможет исследовать систему линейных уравнений на совместность (<a href=\"http://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D0%BE%D1%80%D0%B5%D0%BC%D0%B0_%D0%9A%D1%80%D0%BE%D0%BD%D0%B5%D0%BA%D0%B5%D1%80%D0%B0-%D0%9A%D0%B0%D0%BF%D0%B5%D0%BB%D0%BB%D0%B8\">теорема Кронекера-Капелли</a>), определить количество решений, решить Систему Линейных Алгебраических Уравнений (СЛАУ) <a href=\"http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%93%D0%B0%D1%83%D1%81%D1%81%D0%B0\">методом Гаусса</a>, <a href=\"http://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D1%82%D1%80%D0%B8%D1%87%D0%BD%D1%8B%D0%B9_%D0%BC%D0%B5%D1%82%D0%BE%D0%B4\">матричным методом</a> или <a href=\"http://ru.wikipedia.org/wiki/%D0%9C%D0%B5%D1%82%D0%BE%D0%B4_%D0%9A%D1%80%D0%B0%D0%BC%D0%B5%D1%80%D0%B0\">методом Крамера</a>, найти общее, частное и базисные решения. Введите коэффициенты при неизвестных в поля. Если Ваше уравнение имеет меньшее количество неизвестных, то оставьте пустыми поля при переменных, не входящих в ваше уравнение. Можно использовать дроби (13/31). Подробнее о СЛАУ читайте в <a href=\"http://ru.wikipedia.org/wiki/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D0%BB%D0%B8%D0%BD%D0%B5%D0%B9%D0%BD%D1%8B%D1%85_%D0%B0%D0%BB%D0%B3%D0%B5%D0%B1%D1%80%D0%B0%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%B8%D1%85_%D1%83%D1%80%D0%B0%D0%B2%D0%BD%D0%B5%D0%BD%D0%B8%D0%B9\">ВикипедиИ</a>.",
    sluTitle: "Решение системы линейных уравнений (СЛАУ) онлайн",

    testForConsistency: "Исследовать на совместность",
    solveByKrammer: "Решить методом Крамера",
    solveByInverse: "Решить методом обратной",
    solveByGauss: "Решить методом Гауcса",
    solveByJordanGauss: "Решить методом Жордана-Гауcса",

    /* det.html */
    detTitle: "Нахождение определителя матрицы",
    detDescription: "Калькулятор для нахождения определителя матрицы",
    detHeader: "Найти определитель матрицы",
    detIntro: "Этот калькулятор поможет Вам вычислить <a href=\"http://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C\">определитель</a>, разложив его по строке или столбцу, либо предварительно получив нули в строке или столбце. Детерминант будет вычислен с выводом промежуточных результатов.",
    expandBy: "Разложить по",
    column: "столбцу",
    row: "строке",
    obtainZerosIn: "Получить нули в",
    column2: "столбце",

    /* vectors.html */
    vectorsTitle: "Собственные векторы и собственные числа",
    vectorsDescription: "Калькулятор для нахождение собственных чисел и собственных векторов",
    vectorsHeader: "Нахождение собственных чисел и собственных векторов",
    vectorsIntro: "Данный калькулятор поможет найти собственные числа и векторы, используя характеристическое уравнение.",
    vectorsFind: "Найти",

    rankDetailsStart: "<p>Найдем ранг матрицы методом <a href=\"http://ru.wikipedia.org/wiki/%D0%AD%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%B0%D1%80%D0%BD%D1%8B%D0%B5_%D0%BF%D1%80%D0%B5%D0%BE%D0%B1%D1%80%D0%B0%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F_%D0%BC%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B\">элементарных преобразований</a>. Ранг матрицы равен числу ненулевых строк в матрице после приведения её к ступенчатой форме при помощи элементарных преобразований над строками матрицы.</p><ul>",
    rankDetailsRowAddition: "<li>Добавляем к строке <code>{s}</code> строку <code>{c}</code>, чтобы получить ненулевой элемент на главной диагонале.</li>",
    rankDetailsRowSubtraction: "<li>Вычитаем из строки <code>{s}</code> строку <code>{c}</code>, умноженную на <code>{B}</code>, чтобы получить нули ниже главной диагонали.</li>",
    rankDetailsEnd: "</ul>",

    determinantDetailsStart: "<p>Приведем матрицу к <a href=\"http://ru.wikipedia.org/wiki/%D0%A1%D1%82%D1%83%D0%BF%D0%B5%D0%BD%D1%87%D0%B0%D1%82%D1%8B%D0%B9_%D0%B2%D0%B8%D0%B4_%D0%BF%D0%BE_%D1%81%D1%82%D1%80%D0%BE%D0%BA%D0%B0%D0%BC\">ступенчатому виду</a>. Операция добавления к одной из строк матрицы другой строки, умноженной на некоторое число, не меняет <a href=\"http://ru.wikipedia.org/wiki/%D0%9E%D0%BF%D1%80%D0%B5%D0%B4%D0%B5%D0%BB%D0%B8%D1%82%D0%B5%D0%BB%D1%8C\">определитель</a>. Определитель преобразованной матрицы равен определителю исходной.</p><ul>",
    determinantDetailsRowAddition: "<li>Добавляем к строке <code>{s}</code> строку <code>{c}</code>, чтобы получить ненулевой элемент на главной диагонале.</li>",
    determinantDetailsRowSubtraction: "<li>Вычитаем из строки <code>{s}</code> строку <code>{c}</code>, умноженную на <code>{B}</code>.</li>",
    determinantDetailsEnd: "</ul>"
  },
  en: {
    showExampleOfSystemInput: "Show how to input next system:",

    externalLinks: "",
    close: "Close",

    matrixOperations: "Matrix calculator",
    solvingSystemsOfLinearEquations: "System of equations",
    determinantCalculation: "Expansion of a determinant",
    examples: "Examples",
    eigenvalues: "Eigenvalues",
    wikiLink: "http://en.wikipedia.org/wiki/Matrix_(mathematics)",
    wiki: "WikipediA:Matrices",
    matrix: "Matrix",
    cells: "cells",
    clear: "clear",
    advices: "<ul><li>leave extra cells <i>empty</i> to enter the non-square matrix</li><li>you can use decimal (finite and periodic) fractions: ${samples0} ; or arithmetic expressions: ${samples1}</li><li>use <kbd>enter</kbd>, <kbd>space</kbd>, <kbd>arrow-keys</kbd> to navigate between cells</li><li>drag-and-drop matrices from the results, or even from/to a text editor</li><li>to learn more about matrices use <a href=\"http://en.wikipedia.org/wiki/Matrix_(mathematics)\" title=\"Matrices, main operations\">WikipediA</a>.</li></ul>",
    displayDecimal: "display decimals",
    numberOfDecimalPlaces: "number of decimal places",
    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "Determinant of a matrix = 0, the matrix is not invertible",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "the number of columns in first matrix should equal the number of rows in second",
    matricesShouldHaveSameDimensions: "the sizes of matrices should be identical!",
    summaryLabel: "Details",
    text11: " 1) we shall find own numbers from the characteristic equation: ",
    text12: " then we have a homogeneous system of linear equations, we solve it by Gaussian Elimination: ",
    text13: " 2) For every &lambda; we shall find its own vector:",
    text14: "There are no rational decisions.",
    textAnalyseCompatibility: "Analyse compatibility matrix of the system",
    textAn1a: "Rank of augmented matrix equal rank of matrix of the system, and equal number of variables => system is compatible and has unique solution.",
    textAn1b: "Rank of augmented matrix equal rank of matrix of the system, and less than number of variables => system is compatible has infinitely many solutions.",
    textAn2: "Rank of augmented matrix is not equal to rank of matrix of the system => system is not compatible (has no solutions).",
    text01: "For the decision using Cramer's rule number of equations should be equal to number of variables! ",
    text02: "For the decision the determinant of a matrix of system should not be equal Cramer's by method to zero! ",
    //text03: "please, correctly fill a column of the right parts ",
    text04: "The solution by Cramer's rule: ",
    text05: "To solve the system by Inverse Matrix Method it must have the same number of equations as variables.",
//    TODO:
//    text05: "For the decision a method of the Return matrix number of equations should be equal to number of variables! ",
    text06: "For the decision the determinant of a matrix of system should not be equal by a method of the Return matrix to zero! ",
    text08: "Solution by Inverse Matrix Method",
    textAnswer: "Answer:",
    //text50: " Please, correctly fill a column of the right parts and matrix of the system.",
    text51: "<h4>Solution by Gauss' Method:</h4> The augmented matrix of the system:",
    text52: " there are no DECISIONS! ",
    text53: " the common decision: ",
    textInsertin: "insert in",
    textClear: "clear",
    textFundamentalSystem: "fundamental system of solutions",
    textBasicSolutions: "basic solutions",
    inputError: "Please check entered data. You can use decimal fractions or simple fractions such as 1/3 or 1.2e-3 or 3.14 or 1.2(3) ",
    matrixIsNotSquare: "Matrix is not square",
    divisionByZeroError: "Division by zero",
    exponentIsNegative: "Exponent is negative",
    or: "or",
    showText: "Show as plain text",
    showMathML: "Show MathML",
    showImage: "Show as image",
    showComments: "Comments",
    tweet: "Tweet",
    notEnoughRationalEigenvalues: "Not Enough Rational Eigenvalues",
    indexTitle: "Matrix calculator",
    indexDescription: "Matrix addition, multiplication, inversion, determinant and rank calculation, transposing, bringing to diagonal, triangular form, exponentiation",
    swapMatrices: "Swap matrices",
    multiplyMatrices: "Matrix multiplication",
    addMatrices: "Matrix addition",
    subtractBFromA: "Matrix subtraction",
    indexIntro1: "With help of this calculator you can: find the determinant of a matrice, the rank, raise matrice to power, find sum and multiplication of matrices, calculate inverse matrix. Just type matrix elements and click the button.",
    findDeterminant: "find a determinant",
    findInverse: "find an inverse",
    findTranspose: "transpose",
    findRank: "rank",
    multiplyBy: "multiply by",
    triangularMatrix: "triangular matrix",
    diagonalMatrix: "diagonal matrix",
    exponentiation: "raise to the power of",
    sluDescription: "Page for decision of system of the linear equations",
    sluHeader: "Solving a linear system",
    sluIntro: "This page will help to analyse compatibility of the system of the Linear Equations (SLE), solved by method of Gauss, a inverse matrix or Cramer's rule. Enter factors at empty fields. If your equation has smaller quantity of items leave slots at the variables which are not used in your equations empty. It is possible to use fractions (13/31).",
    sluTitle: "Decision of systems of the linear equation",
    testForConsistency: "Test For Compatibility",
    solveByKrammer: "Solve by Cramer's rule",
    solveByInverse: "Solve by inverse",
    solveByGauss: "Solve by Gauss",
    solveByJordanGauss: "Solve by Gauss–Jordan elimination",
    detTitle: "Find a determinant, expand it along a row or column, create zero entries on a row or column preliminary",
    detDescription: "Find a determinant right here! Expand it along a row or column, create zero entries to simplifies the subsequent calculations.",
    detHeader: "Determinant calculation by expanding it on a line or column, using Laplace's formula.",
    detIntro: "<p>Bring elements of a matrix in the table. Then press the button. Use the Blank, Input, BackSpace for moving on cells. Use \"/\" for input of fractions (for example, \"3/2\").</p>",
    expandBy: "Expand along",
    column: "a column",
    row: "a row",
    obtainZerosIn: "Obtain Zeros in",
    column2: "a column",
    vectorsTitle: "Eigenvalues and Eigenvectors",
    vectorsDescription: "Enter a matrix to calculate eigenvalues and eigenvectors",
    vectorsHeader: "Finding of eigenvalues and eigenvectors.",
    vectorsIntro: "<p>You can find only rational eigenvalues!</p>",
    vectorsFind: "Find"
  },
  bg: {
    externalLinks: "",
    close: "Близо",

    matrixOperations: "Операции с матрици",
    solvingSystemsOfLinearEquations: "Система от линейни уравнения",
    determinantCalculation: "Решение на детерминанта",
    examples: "Примери",
    eigenvalues: "Собствени стойности",
    wikiLink: "http://bg.wikipedia.org/wiki/%D0%9C%D0%B0%D1%82%D1%80%D0%B8%D1%86%D0%B0_%28%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0%29",
    wiki: "Уикипедия: Матрици",
    matrix: "Матрица",
    cells: "клетки",
    clear: "изчисти",
    advices: "",
    displayDecimal: "Показване на числата с десетична запетая",
    numberOfDecimalPlaces: "брой цифри след запетаята",
    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "Детерминантата на матрицата е равна на 0, т.е. матрицата НЕ е обратима",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "Броя на колоните в първата матрица не е равен на броя на редовете на втората",
    matricesShouldHaveSameDimensions: "Матриците трябва да са от една и съща размерност!",
    summaryLabel: "Детайли",
    text11: " 1) Намираме собствените стойности от характеристичното уравнение: ",
    text12: " след което имаме линейна система от хомогенни уравнения, която решаваме по метода на Гаус: ",
    text13: " 2) За всяко &lambda; намираме собствен вектор:",
    text14: "Няма решение с рационални числа.",
    textAnalyseCompatibility: "Изследваме системата за съвместимост",
    textAn1a: "Рангът на разширената матрица е равен на ранга на матрицата на системата и е равен на броя на неизвестните, следователно системата е съвместима и има едно уникално решение.",
    textAn1b: "Рангът на разширената матрица е равен на ранга на матрицата на системата, но е по-малък от броя на неизвестните, следователно системата е съвместима и има безброй много решения.",
    textAn2: "Рангът на разширената матрица НЕ е равен на ранга на матрицата на системата, следователно системата е несъвместима и няма решение.",
    text01: "За решение по метода на Крамер е нужно броят на уравненията да е равен на броя на неизвестните! ",
    text02: "За решение по метода на Крамер е нужно детерминантата на системата да е различна от нула! ",
    //text03: "Моля попълнете коректно стълба в дясната част.",
    text04: "Решение по метода на Крамер: ",
    text05: "За решение чрез матрично уравнение е нужно броят на уравненията да е равен на броя на неизвестните! ",
    text06: "За решение чрез матрично уравнение е нужно детерминантата на системата да е различна от нула! ",
    text08: "Решение чрез матрично уравнение",
    textAnswer: "Отговор:",
    //text50: " Моля попълнете коректно стълба в дясната част.",
    text51: "Решение по метода на Гаус<br>Разширена матрица на системата: ",
    text52: "Няма решение! ",
    text53: "Общо решение: ",
    textInsertin: "Вмъкни в",
    textClear: "Изчисти",
    textFundamentalSystem: "Фундаментална система от решения",
    textBasicSolutions: "базисни решения",
    inputError: "Моля проверете въведените данни. Може да използвате дроби и числа с десетична запетая като 1/3 или 1.2e-3 или 3.14 или 1.2(3) ",
    matrixIsNotSquare: "Матрицата не е квадратна",
    divisionByZeroError: "Деление на нула",
    exponentIsNegative: "Експонентата е отрицателна",
    or: "или",
    showText: "Покажи като текст",
    showMathML: "Покажи MathML",
    showImage: "Покажи като картинка",
    showComments: "Коментари",
    tweet: "Tweet",
    notEnoughRationalEigenvalues: "Собствените стойности не са рационални",
    indexTitle: "Калкулатор за Линейна Алгебра",
    indexDescription: "онлайн калкулатор за детерминанти, ранг, обратни матрици, решения на системи от линейни уравнения",
    swapMatrices: "обмен",
    multiplyMatrices: "Умножение на матрици",
    addMatrices: "Сбор на матрици",
    subtractBFromA: "Извади B от A",
    indexIntro1: "<h1>Онлайн матричен калкулатор</h1><p>С този калкулатор можете да: намирате детерминанти, ранг на матрица, умножение на матрици, намиране на обратна матрица и т.н.Въведете елементите на матрицата в текстовите полета на таблицата. Може да въвеждате дроби като 12/34 или числа с десетична запетая като ${samples0}. Възможно е да въвеждате и изрази като: ${samples1}. Поддържат се много големи числа. Програмата е интерактивна - може да провлачвате получените резултати с мишката. Използвайте шпация (space), enter и стрелките на клавиатурата, за да се движите по-лесно между клетките на таблицата.<strong><a href=\"http://bg.wikipedia.org/wiki/%D0%9C%D0%B0%D1%82%D1%80%D0%B8%D1%86%D0%B0_%28%D0%BC%D0%B0%D1%82%D0%B5%D0%BC%D0%B0%D1%82%D0%B8%D0%BA%D0%B0%29\" title=\"Матрици\" target=\"_blank\">Уикипедия - Матрици</a></strong>",
    findDeterminant: "Детерминанта",
    findInverse: "Обратна матрица",
    findTranspose: "Транспониране",
    findRank: "Ранг",
    multiplyBy: "Умножи с числото",
    triangularMatrix: "Триъгълен вид",
    diagonalMatrix: "Диагонализирай",
    exponentiation: "Степенувай",
    sluDescription: "Страница за решение на системи от линейни уравнения",
    sluHeader: "Решение на система от линейни уравнения",
    sluIntro: "На тази страница можете да изследвате система от линейни уравнения за съвместимост и да я решавате по методите на Крамер, Гаус, Гаус-Жордан и чрез матрично уравнение. Въведете коефициентите пред неизвестните в празните полета. Ако имате повече полета отколкото неизвестни, оставете ненужните полета празни. Може да използвате дроби (например 13/31).",
    sluTitle: "Решение на система от линейни уравнения по методите на Гаус, Крамер и с матрично уравнение",
    testForConsistency: "Проверка за съвместимост",
    solveByKrammer: "Реши по метода на Крамер",
    solveByInverse: "Реши чрез матрично уравнение",
    solveByGauss: "Реши по метода на Гаус",
    solveByJordanGauss: "Реши по метода на Гаус-Жордан",
    detTitle: "Намерете детерминанта чрез развитие по ред или стълб (изберете по кой ред или стълб да бъде развита) или я решете чрез свеждане до детерминанта от по-нисък ред чрез правене на нули по ред или стълб",
    detDescription: "Намерете детерминанта! Развийте я по ред или стълб, правете нули по ред или стълб за опростяване на сметките.",
    detHeader: "Решение на детерминанта чрез развитие по ред или стълб, използване на формулата на Лаплас.",
    detIntro: "<p>Въведете елементите на матрицата в таблицата. Използвайте + и - за да увеличавате или намалявате реда на детерминантата. След това въведете по кой ред или стълб искате да развиете детерминантата и натиснете съответния бутон, за да получите решението. Използвайте стрелките, шпация (space) или връщане назад (backspace), за по-лесно движение между клетките на таблицата. Използвайте \"/\" за да въвеждате дроби (например, \"3/2\").</p>",
    expandBy: "Развий по:",
    column: "стълб №",
    row: "ред №",
    obtainZerosIn: "Направи нули по:",
    column2: "стълб №",
    vectorsTitle: "Собствени стойности и собствени вектори",
    vectorsDescription: "Въведете матрица - намерете собствените стойности и собствените вектори",
    vectorsHeader: "Намиране на собствени стойности и собствени вектори.",
    vectorsIntro: "<p>Определение: ненулев вектор x от пространството R<sub>n</sub> се казва собствен вектор на квадратната матрица A от ред n, съответстващ на собствената стойност &lambda;, ако AX=&lambda;X , AX-&lambda;X=0 , (A-&lambda;E)X=0. Собствените стойности се намират от уравнението |A-&lambda;E|=0, което наричаме характеристично уравнение.</p><p>Тази страница работи само със собствени стойности, които са рационални числа!!</p>",
    vectorsFind: "Намери"
  },
  es: {
    showExampleOfSystemInput: "mostrar un ejemplo de input del sistema",
    externalLinks: "",
    close: "Cerrar",
    matrixOperations: "Operaciones con matrices",
    solvingSystemsOfLinearEquations: "Solución de Sistemas de Ecuaciones Lineales",
    determinantCalculation: "Calculadora de determinantes",
    examples: "Ejemplos de soluciones",
    eigenvalues: "Cálculo de valores propios y vectores propios",
    wikiLink: "http://es.wikipedia.org/wiki/Matriz_(matem%C3%A1ticas)",
    wiki: "Teoría necesaria",
    matrix: "Matriz",
    cells: "celdas",
    clear: "limpiar",
    advices: "<ul><li>deje unas <i>celdas vacías</i> para entrar unas matrices no cuadradas</li>" +
    "<li>usted puede utilizar: unos fracciónes decimales (finitos y periódicos): ${samples0}; algunas expresiones aritméticas: ${samples1}</li>" +
    "<li>utilize <kbd>↲ Entrar</kbd>, <kbd>Barra espaciadora</kbd>, <kbd>←</kbd>, <kbd>→</kbd>, <kbd>↑</kbd>, <kbd>↓</kbd> para navegar sobre las células</li>" +
    "<li>arrastre unas matrices de resultados (<a href=\"http://es.wikipedia.org/wiki/Arrastrar_y_soltar\">arrastrar y soltar</a>) o de un editor de texto</li>" +
    "<li>para la teoría de matrices y operaciones con ellos, consulte la página en la <a href=\"http://es.wikipedia.org/wiki/Matriz_(matem%C3%A1ticas)\">Wikipedia</a></li>" +
    "</ul>",
    displayDecimal: "Mostrar números decimales",
    numberOfDecimalPlaces: "número de decimales",
    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "El determinante de la matriz es cero, la matriz es no <a href=\"http://es.wikipedia.org/wiki/Matriz_invertible\">invertible</a>.",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "El número de columnas de la primera matriz debe coincidir con el número de filas de la segunda matriz.",
    matricesShouldHaveSameDimensions: "Las matrices deben tener el mismo tamaño, la misma cantidad de columnas y de filas.",
    summaryLabel: "Los detalles",
    text11: "1) Cálculo de los valores propios de la <a href=\"http://es.wikipedia.org/wiki/Polinomio_caracter%C3%ADstico\">polinomio característico</a>:",
    text12: "Esto es el sistema de ecuaciones lineales, podemos resolver el sistema por eliminación de Gauss:",
    text13: "2) Cálculo de los vectores propios para cada de los valores propios:",
    text14: "No hay decisiones racionales.",
    textAnalyseCompatibility: "Análisis de la compatibilidad del sistema.",
    textAn1a: "El rango de la matriz aumentada coincide con el rango de matriz de coeficientes y coincide con el número de incógnitas => el sistema es <a href=\"http://es.wikipedia.org/wiki/Sistema_de_ecuaciones_lineales#Tipos_de_sistemas\">compatible determinado</a>.",
    textAn1b: "El rango de la matriz aumentada coincide con el rango de matriz de coeficientes, pero no coincide con el número de incógnitas => el sistema es <a href=\"http://es.wikipedia.org/wiki/Sistema_de_ecuaciones_lineales#Tipos_de_sistemas\">compatible indeterminado</a>.",
    textAn2: "El rango de la matriz ampliada no coincide con el rango de matriz de coeficientes = > el sistema <a href=\"http://es.wikipedia.org/wiki/Sistema_de_ecuaciones_lineales#Tipos_de_sistemas\">incompatible</a> (no presenta ninguna solución).",
    text01: "Para resolver por <a href=\"http://es.wikipedia.org/wiki/Regla_de_Cramer\">la regla de Cramer</a> el número de ecuaciones debe ser igual al número de incógnitas",
    text02: "Para resolver por <a href=\"http://es.wikipedia.org/wiki/Regla_de_Cramer\">la regla de Cramer</a> el determinante de la matriz los coeficientes (matriz del sistema) debe ser diferente de cero",
    //text03: "Por favor, rellene la columna correcta de los lados derecho",
    text04: "La solución por la regla de Cramer:",
    text05: "Para resolver el sistema por el método de la matriz inversa ella debe tener el mismo número de ecuaciones como incógnitas.",
    text06: "Para resolver el sistema por el método de la matriz inversa el determinante de la matriz de sistema debe ser diferente de cero",
    text08: "La solución por el método de la matriz inversa:",
    textAnswer: "La respuesta:",
    //text50: "Por favor, consulte matriz rellena correctamente ( no se olvide de llenar en la columna de la derecha)",
    text51: "<h4>La solución por método de Gauss</h4> La matriz aumentada del sistema:",
    text52: "No existe solución.",
    text53: "La solución general:",
    textInsertin: "insertar en",
    textClear: "limpiar",
    textFundamentalSystem: "El sistema fundamental de soluciones",
    textBasicSolutions: "Las soluciones fundamentáis",
    inputError: "Por favor, compruebe los datos introducidos (puede introducir unos números en forma: 1/23 , 12.45 , -1.3 (56); 1.2e - 4 , 2/3 3 * ( 4.10 ) ( 1 + x) / y ^ 2 )",
    matrixIsNotSquare: "La matriz no es cuadrada",
    divisionByZeroError: "División por cero",
    exponentIsNegative: "La exponente es negativo",
    or: "o",
    showText: "Mostrar como texto",
    showMathML: "Mostrar como MathML",
    showImage: "Mostrar como imagen",
    showComments: "Comentarios",
    tweet: "Tweet",
    notEnoughRationalEigenvalues: "No hay suficientes valores propios racionales",
    indexTitle: "Calculadora de Matrices",
    /*TODO: fix*/
    indexDescription: "Cálculo de suma de matrices, de diferencia de matrices, de producto de matrices, matriz inversa, de determinante, de matriz transpuesta; Reducir matrices en forma escalonada; Exponenciación",
    swapMatrices: "Intercambiar A y B",
    multiplyMatrices: "Multiplicación",
    addMatrices: "Adición",
    subtractBFromA: "Sustracción",
    indexIntro1: "Con esta calculadora podrás: calcular un determinante, un rango, una suma de matrices, un producto de matrices, una matriz inversa y otros.",
    findDeterminant: "Determinante",
    findInverse: "Matriz Inversa",
    findTranspose: "Matriz Transpuesta",
    findRank: "Rango",
    multiplyBy: "Multiplicar por",
    triangularMatrix: "Matriz Triangular",
    diagonalMatrix: "Matriz Diagonal",
    exponentiation: "Matriz elevada a",
    sluDescription: "Resolver sistemas de ecuaciones lineales (Método de la Matriz Inversa, Método de Gauss, Regla de Cramer), calcular el número de soluciones.",
    sluHeader: "Solución de sistemas de ecuaciones lineales",
    sluIntro: "Esta aplicación resuelve unos <a href=\"http://es.wikipedia.org/wiki/Sistema_de_ecuaciones_lineales\">sistemas de ecuaciones lineales</a> por el método de <a href=\"http://es.wikipedia.org/wiki/Eliminaci%C3%B3n_de_Gauss-Jordan\">eliminación de Gauss</a>, por método de la Matriz Inversa, por la <a href=\"http://es.wikipedia.org/wiki/Regla_de_Cramer\">Regla de Cramer</a>" +
              "También usted puede analizar la compatibilidad de sistemas por <a href=\"http://es.wikipedia.org/wiki/Teorema_de_Rouch%C3%A9%E2%80%93Frobenius\">Teorema_de_Rouché–Frobenius</a> para determinar el número de soluciones" + 
              "Entre coeficientes de tus sistema, deje los campos en blanco si las variables no participan en la ecuación",
    sluTitle: "Resolver sistemas de ecuaciones lineales online",
    testForConsistency: "Análisis de consistencia",
    solveByKrammer: "Solución por la Regla de Cramer",
    solveByInverse: "Solución por el Método de la Matriz Inversa",
    solveByGauss: "Solución por el Método de Gauss",
    solveByJordanGauss: "Solución por el Método de Gauss-Jordan",
    detTitle: "Matriz determinante calculadora",
    detDescription: "",
    detHeader: "Matriz determinante calculadora",
    detIntro: "Esta calculadora ayuda a encontrar el <a href=\"http://es.wikipedia.org/wiki/Determinante_(matem%C3%A1tica)\">determinante</a>, por ampliando a lo largo de una fila o columna,utilizando la fila de reducción para obtener ceros en una fila o columna. Determinantes se calculan con la salida de los resultados intermedios.",
    expandBy: "Expandir por",
    column: "columna",
    row: "fila",
    obtainZerosIn: "obtener ceros en",
    column2: "columna",
    vectorsTitle: "Vectores y valores propios",
    vectorsDescription: "Calculadora de los valores propios y vectores propios",
    vectorsHeader: "Calculo de los valores y vectores propios",
    vectorsIntro: "Esta calculadora le ayuda a encontrar los valores propios y los vectores propios utilizando la polinomio característico.",
    vectorsFind: "Encontrar"
  },
  pt: {
    showExampleOfSystemInput: "mostrar um exemplo de sistema de entrada",
    externalLinks: "",
    close: "Fechar",
    matrixOperations: "Operações envolvendo matrizes",
    solvingSystemsOfLinearEquations: "Soluções de Sistemas de Equações Lineares",
    determinantCalculation: "Calculadora de determinantes",
    examples: "Exemplos de soluções",
    eigenvalues: "Cálculo de autovalores propios e vector próprios",
    wikiLink: "http://pt.wikipedia.org/wiki/Matriz_(matem%C3%A1tica)#Determinante",
    wiki: "Teoria necessária",
    matrix: "Matriz",
    cells: "células",
    clear: "limpar",
    advices: "<ul><li>deixa <i>células vazias</i> para entrar de uma matriz não quadrada</li>" +
             "<li>você pode usar: decimais exatos, decimais periódicos: ${samples0}; algumas expressões aritméticas: ${samples1}</li>" +
             "<li>usar <kbd>↲ Enter</kbd>, <kbd>Barra de espaço</kbd>, <kbd>←</kbd>, <kbd>→</kbd>, <kbd>↑</kbd>, <kbd>↓</kbd> para navegar sobre células</li>" +
             "<li>arrastre matrizes de resultados (<a href=\"http://pt.wikipedia.org/wiki/Drag-and-drop\">Drag-and-drop</a>) ou do um editor de texto</li>" +
             "<li>para a teoria de matrizes e operações sobre eles, consulte a página da <a href=\"http://es.wikipedia.org/wiki/Matriz_(matem%C3%A1ticas)\">Wikipedia</a></li>" +
             "</ul>",
    displayDecimal: "Mostrar números decimais",
    numberOfDecimalPlaces: "número de decimales",
    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "O determinante desta matriz será zero, então a matriz é não <a href=\"http://pt.wikipedia.org/wiki/Matriz_inversa\">invertível</a>.",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "O número de colunas da matriz da esquerda deve ser igual número de linhas da matriz da direita.",
    matricesShouldHaveSameDimensions: "As matrizes devem ter o mesmo tamanho, o mesmo número de linhas e colunas.",
    summaryLabel: "Detalhes",
    text11: "1) Cálculo de los valores próprios de la <a href=\"http://pt.wikipedia.org/wiki/Polin%C3%B4mio_caracter%C3%ADstico\">polinómio característico</a>:",
    text12: "Este é o sistema de equações lineares, podemos resolver el sistema por eliminação de Gauss:",
    text13: "2) Cálculo de los vectores próprios para cada de los valoers próprios:",
    text14: "Não há decisões racionais.",
    textAnalyseCompatibility: "Análise de compatibilidade do sistema.",
    textAn1a: "O posto da matriz ampliada é igual ao posto da matriz dos coeficientes e é igual ao número de variáveis. <a href=\"http://www.igm.mat.br/aplicativos/index.php?option=com_content&view=article&id=165%3Afrobenius&catid=41%3Aconteudosal&Itemid=38\">O sistema é possível e determinado.</a>",
    textAn1b: "O posto da matriz ampliada é igual ao posto da matriz dos coeficientes, mas não é igual ao número de variáveis. <a href=\"http://www.igm.mat.br/aplicativos/index.php?option=com_content&view=article&id=165%3Afrobenius&catid=41%3Aconteudosal&Itemid=38\">O sistema é possível e indeterminado.</a>",
    textAn2: "O posto da matriz ampliada não é igual ao posto da matriz dos coeficientes e não é igual ao número de variáveis. <a href=\"http://www.igm.mat.br/aplicativos/index.php?option=com_content&view=article&id=165%3Afrobenius&catid=41%3Aconteudosal&Itemid=38\">O sistema é impossível e indeterminado.</a>",
    // http://aula.tareasplus.com/Roberto-Cuartas/Algebra-Elemental/Solucion-de-un-sistema-de-ecuaciones-2x2-por-regla-de-cramer
    text01: "Para solucionar por <a href=\"http://pt.wikipedia.org/wiki/Regra_de_Cramer\">Regra de Cramer</a> o número de equações deve ser igual ao número de incógnitas",
    text02: "Para solucionar por <a href=\"http://pt.wikipedia.org/wiki/Regra_de_Cramer\">Regra de Cramer</a> o determinante da matriz dos coeficientes (matriz da sistema) deve ser distinto de zero",
    text04: "Solução utilizando a Regra de Cramer:",
    text05: "Para solucionar o sistema por Método da Matriz Inversa ele deve ter o mesmo número de equações como variáveis.",
    text06: "Para solucionar o sistema por Método da Matriz Inversa o determinante da matriz de sistema deve ser distinto de zero.",
    text08: "Solução utilizando a Método da Matriz Inversa:",
    textAnswer: "A resposta:",
    text51: "<h4>Solução utilizando a Método de Gauss</h4> A matriz aumentada del sistema:",
    text52: "Não tem solução.",
    text53: "A solução geral do:",
    textInsertin: "inserir na",
    textClear: "limpar",
    textFundamentalSystem: "O sistema básico de soluções",
    textBasicSolutions: "Os soluções fundamentos",
    inputError: "Por favor verifique a expressão (você pode digitar um número na forma: 1/23 , 12.45 , -1.3 (56); 1.2e - 4 , 2/3 3 * ( 4.10 ) ( 1 + x) / y ^ 2 )",
    matrixIsNotSquare: "A matriz não é quadrada",
    divisionByZeroError: "Divisão por zero",
    exponentIsNegative: "O expoente é negativo",
    or: "ou",
    showText: "Mostrar como texto",
    showMathML: "Mostrar como MathML",
    showImage: "Mostrar como imagen",
    showComments: "Mostrar comentários",
    tweet: "Tweet",
    notEnoughRationalEigenvalues: "Não basta autovalores racionais",
    indexTitle: "Calculadora de Matrizes",
    indexDescription: "Cálculo de suma de matrizes, de diferencia de matrizes, de producto de matrices, matriz inversa, de determinante, de matriz transpuesta; Reduzir matrizes um forma escalonada; Exponenciação",
    swapMatrices: "Trocar A e B",
    multiplyMatrices: "Multiplicação",
    addMatrices: "Adição",
    subtractBFromA: "Subtração",
    indexIntro1: "Com esta calculadora você pode: calcular o determinante, o rank, uma soma de matrizes, um produto de matrizes, uma matriz inversa e outros.",
    findDeterminant: "Determinante",
    findInverse: "Matriz Inversa",
    findTranspose: "Matriz Transposta",
    findRank: "Posto",
    multiplyBy: "Multiplicar por",
    triangularMatrix: "Matriz Triangular",
    diagonalMatrix: "Matriz Diagonal",
    exponentiation: "Elevado a",
    sluDescription: "Resolução de Sistemas de Equações Lineares (Método de la Matriz Inversa, Método de Eliminação de Gauss, Regla de Cramer), calcular o número de soluções.",
    sluHeader: "Soluções de sistemas equações lineares",
    sluIntro: "Esta página permite resolver <a href=\"http://pt.wikipedia.org/wiki/Sistema_de_equa%C3%A7%C3%B5es_lineares\">sistemas de equações lineares</a> por o método de <a href=\"http://pt.wikipedia.org/wiki/Elimina%C3%A7%C3%A3o_de_Gauss\">Eliminação de Gauss</a>, por o método de a Matix Inversa, por a <a href=\"http://pt.wikipedia.org/wiki/Regra_de_Cramer\">Regra de Cramer</a>." +
              "Também você pode analisar a compatibilidade dos sistemas usando <a href=\"http://www.igm.mat.br/aplicativos/index.php?option=com_content&view=article&id=165%3Afrobenius&catid=41%3Aconteudosal&Itemid=38\">Teorema_de_Rouché–Frobenius</a> para determinar o número de soluções." +
              "Entre os coeficientes de seu sistema, deixe os campos em branco se as variáveis não participam na equação.",
    sluTitle: "Resolver sistemas de equações lineares online",
    testForConsistency: "Análise de consistência",
    solveByKrammer: "Solução utilizando a Regra de Cramer",
    solveByInverse: "Solução utilizando o Método de la Matriz Inversa",
    solveByGauss: "Solução utilizando o Método de Gauss",
    solveByJordanGauss: "Solução utilizando o Método de Gauss-Jordan",
    detTitle: "Calculador de Matriz Determinantes",
    detDescription: "",
    detHeader: "Calculador de Matriz Determinantes",
    detIntro: "Esta calculadora ajuda você a encontrar o <a href=\"http://pt.wikipedia.org/wiki/Determinante\">determinante</a> pela expansão ao longo de uma linha ou coluna usando a redução de linha para obter zeros em uma linha ou coluna. Determinantes são calculados com a saída de resultados intermédios.",
    expandBy: "Expandir por",
    column: "coluna",
    row: "linha",
    obtainZerosIn: "obter zeros em",
    column2: "coluna",
    vectorsTitle: "Valores y vectores propios",
    vectorsDescription: "Autovalores e autovetores da calculadora",
    vectorsHeader: "Cálculo dos valores e vectores próprios",
    vectorsIntro: "Esta calculadora ajuda você a encontrar os valores e vectores próprios, usando o polinômio característico.",
    vectorsFind: "Encontrar"
  },
  it: {
    showExampleOfSystemInput: "mostrare un esempio di ingresso del sistema",
    externalLinks: "",
    close: "Chiudi",
    matrixOperations: "Operazioni con matrici",
    solvingSystemsOfLinearEquations: "Risoluzione Sistema di equazioni lineari",
    determinantCalculation: "Calcolatore di determinanti",
    examples: "esempi",
    eigenvalues: "Calcolo di autovalori e autovettori",
    wikiLink: "http://it.wikipedia.org/wiki/Matrice",
    wiki: "Teoria necessario",
    matrix: "Matrice",
    cells: "celle",
    clear: "pulire",
    advices: "<ul><li>deje unas <i>celdas vacias</i> para entrare delle matrici non quadrate</li>" +
    "<li>È possibile utilizzar: delle frazioni decimali (finite e periodiche): ${samples0}; alcune espressioni aritmetiche: ${samples1}</li>" +
    "<li>utilizzate il <kbd>↵ Invio</kbd>, la <kbd>Barra spaziatrice</kbd>, <kbd>←</kbd>, <kbd>→</kbd>, <kbd>↑</kbd>, <kbd>↓</kbd> per navigare sulle cellule</li>" +
    "<li>trascinate la matrice di risultati (<a href=\"http://es.wikipedia.org/wiki/Arrastrar_y_soltar\">Drag and drop</a>) o di un editor di testo</li>" +
    "<li>per la teoria delle matrici e delle operazioni con loro, consultare la pagina di <a href=\"http://it.wikipedia.org/wiki/Matrice\">Wikipedia</a></li>" +
    "</ul>",
    displayDecimal: "Mostrare numeri decimali",
    numberOfDecimalPlaces: "il numero di cifre decimali",
    determinantIsEqualToZeroTheMatrixIsSingularNotInvertible: "Il determinante della matrice e zero, la matrice non e <a href=\"http://it.wikipedia.org/wiki/Matrice_invertibile\">invertibile</a>.",
    theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond: "Il numero di colonne della prima matrice deve corrispondere al numero di righe della seconda matrice.",
    matricesShouldHaveSameDimensions: "Le matrici devono avere la stessa dimensione, lo stesso numero di colonne e righe.",
    summaryLabel: "Dettagli",
    text11: "1) Calcoliamo gli autovalori del <a href=\"http://it.wikipedia.org/wiki/Polinomio_caratteristico\">polinomio caratteristico</a>:",
    text12: "Questo e il sistema di equazioni lineari, possiamo risolvere il sistema usando l'eliminazione di Gauss:",
    text13: "2) Calcoliamo gli autovettori per ogni autovalore:",
    text14: "Non esistono soluzioni razionali.",
    textAnalyseCompatibility: "Analisi della compatibilita del sistema <a href=\"http://it.wikipedia.org/wiki/Teorema_di_Rouch%C3%A9-Capelli\">usando Il Teorema di Rouche Capelli</a>",
    textAn1a: "Il rango della matrice completa è uguale al rango della matrice incompleta (o matrice dei coefficienti) è uguale al numero di incognite. Il sistema è <a href=\"http://it.wikipedia.org/wiki/Sistema_di_equazioni_lineari#Caratteristiche\">determinato</a> (ha una sola soluzione).",
    textAn1b: "Il rango della matrice completa è uguale al rango della matrice incompleta (o matrice dei coefficienti), ma non è uguale al numero di incognite. Il sistema è <a href=\"http://it.wikipedia.org/wiki/Sistema_di_equazioni_lineari#Caratteristiche\">indeterminato</a> (ha infinite soluzioni).",
    textAn2: "Il rango della matrice completa è uguale al rango della matrice incompleta (o matrice dei coefficienti). Il sistema è <a href=\"http://it.wikipedia.org/wiki/Sistema_di_equazioni_lineari#Caratteristiche\">impossibile</a> (non ha nessuna soluzione).",
    text01: "Per risolvere usando <a href=\"http://it.wikipedia.org/wiki/Regola_di_Cramer\">regola di Cramer</a> il numero di equazioni deve essere uguale al numero di incognite",
    text02: "Per risolvere usando <a href=\"http://it.wikipedia.org/wiki/Regola_di_Cramer\">regola di Cramer</a> il determinante della matrice dei coefficienti deve essere diverso da zero",
    text04: "La soluzione per la regola di Cramer:",
    text05: "Per risolvere il sistema con il metodo della matrice inversa il numero di equazioni deve essere uguale al numero di incognite.",
    text06: "Per risolvere il sistema con il metodo della matrice inversa il determinante della matrice dei coefficienti deve essere diverso da zero.",
    text08: "La soluzione per la metodo della matrice inversa:",
    textAnswer: "La risposta:",
    text51: "<h4>La soluzione con <a href=\"http://it.wikipedia.org/wiki/Metodo_di_eliminazione_di_Gauss\">metodo di eliminazione di Gauss</a></h4> La matrice completa del sistema:",
    text52: "Il sistema non ha soluzioni.",
    text53: "La soluzione generale:",
    textInsertin: "inserire in",
    textClear: "pulire",
    textFundamentalSystem: "Il sistema fondamentale di soluzioni",
    textBasicSolutions: "Le soluzioni fondamentali",
    inputError: "Si prega di verificare i dati inseriti (È possibile inserire alcuni numeri in forma: 1/23 , 12.45 , -1.3 (56); 1.2e - 4 , 2/3 3 * ( 4.10 ) ( 1 + x) / y ^ 2 ))",
    matrixIsNotSquare: "La matrice non è quadrata",
    divisionByZeroError: "Divisione per zero",
    exponentIsNegative: "L'esponente è negativo",
    or: "o",
    showText: "Visualizzare come testo",
    showMathML: "Visualizzare come MathML",
    showImage: "Visualizzare come immagine",
    showComments: "Commenti",
    tweet: "Tweet",
    notEnoughRationalEigenvalues: "Non sufficiente autovalori razionali",
    indexTitle: "Calcolatore di matrici",
    indexDescription: "Questa pagina consente calculare la somma fra matrici, la differenza fra due matrici, il prodotto fra matrici, la matrice inversa, il determinante, la matrice trasposta; Ridurre matrici alla forma canonica di Jordan; Exponentiation", 
    swapMatrices: "Scambiare A y B",
    multiplyMatrices: "Moltiplicazione",
    addMatrices: "Addizione",
    subtractBFromA: "Sottrazione",
    indexIntro1: "Con questa calcolatrice è possibile: calculare il determinante, el rango, la somma fra matrici, il prodotto fra matrici, la matrice inversa e altri.",
    findDeterminant: "Determinante",
    findInverse: "Matrice inversa",
    findTranspose: "Matrice Trasposta",
    findRank: "Rango",
    multiplyBy: "Moltiplicare per",
    triangularMatrix: "Matrice Triangolare",
    diagonalMatrix: "Matrice Diagonale",
    exponentiation: "Matrice elevata a",
    sluDescription: "risolvere sistemi di equazioni lineari (il metodo della matrice inversa, il metodo di eliminazione di Gauss, la regola di Cramer), calcolare il numero di soluzioni.",
    sluHeader: "Risoluzione di sistemi di equazioni lineari",
    sluIntro: "Questa applicazione risolve <a href=\"http://it.wikipedia.org/wiki/Sistema_di_equazioni_lineari\">sistemi di equazioni lineari</a> con <a href=\"http://it.wikipedia.org/wiki/Metodo_di_eliminazione_di_Gauss\">il metodo di eliminazione di Gauss</a>, con <a href=\"http://it.wikipedia.org/wiki/Sistema_di_equazioni_lineari#Strumenti_per_la_risoluzione\">il metodo de la matrice inversa</a>, con <a href=\"http://it.wikipedia.org/wiki/Regola_di_Cramer\">la regola di Cramer</a>" +
              "Anche si può studiare la compatibilità dei sistemi con <a href=\"http://it.wikipedia.org/wiki/Teorema_di_Rouch%C3%A9-Capelli\">Teorema di Rouché-Capelli</a> per determinare il numero di soluzioni. " + 
              "Inserisci coefficienti del vostra sistema, lasciare campi vuoti se le variabili non sono coinvolti nell'equazione.",
    sluTitle: "Risoluzione di sistemi di equazioni lineari",
    testForConsistency: "Studiare la compatibilità",
    solveByKrammer: "Risolvere con la regola di Cramer",
    solveByInverse: "Risolvere con il metoda della matrice inversa",
    solveByGauss: "Risolvere con il metodo di eliminazione di Gauss",
    solveByJordanGauss: "Risolvere con il metodo di eliminazione di Gauss-Jordan",
    detTitle: "Calcolatore di determinanti di matrici",
    detDescription: "",
    detHeader: "Calcolatore di determinanti di matrici",
    detIntro: "Questo calcolatore aiuta a trovare el <a href=\"http://es.wikipedia.org/wiki/Determinante_(matem%C3%A1tica)\">determinante</a>, con espandendo lungo una riga o colonna, usando riduzione di riga per ottenere zeri in una riga o colonna. Determinanti sono calcolati con l'uscita dei risultati intermedi.",
    expandBy: "espandere da",
    column: "colonna",
    row: "riga",
    obtainZerosIn: "ottenere zeri in",
    column2: "colonna",
    vectorsTitle: "Calcolatore di autovettore e autovalore",
    vectorsDescription: "autovettore e autovalore",
    vectorsHeader: "Calcolo di autovalori e autovettori",
    vectorsIntro: "Questo calcolatore ti aiuta a trovare gli autovalori e autovettori usando il polinomio caratteristico.",
    vectorsFind: "Trovare"
  }
};

if (typeof module !== "undefined") {
  module.exports.i18n = i18n;
}

/*jslint plusplus: true, vars: true, indent: 2 */

(function (exports) {
  "use strict";

  // BigInteger.js
  // Available under Public Domain
  // https://github.com/Yaffle/BigInteger/

  // For implementation details, see "The Handbook of Applied Cryptography" http://www.cacr.math.uwaterloo.ca/hac/about/chap14.pdf

  var floor = Math.floor;

  var parseInteger = function (s, from, to, radix) {
    var i = from - 1;
    var n = 0;
    var y = radix < 10 ? radix : 10;
    while (++i < to) {
      var code = s.charCodeAt(i);
      var v = code - 48;
      if (v < 0 || y <= v) {
        v = 10 - 65 + code;
        if (v < 10 || radix <= v) {
          v = 10 - 97 + code;
          if (v < 10 || radix <= v) {
            throw new RangeError();
          }
        }
      }
      n = n * radix + v;
    }
    return n;
  };

  var base = 67108864;

  var createArray = function (length) {
    var x = new Array(length);
    if (x.length !== length) {
      x.length = length; // see https://bugzilla.mozilla.org/show_bug.cgi?id=989586 , http://stackoverflow.com/questions/22726716/new-arraylength-gives-wrong-size
    }
    var i = -1;
    while (++i < length) {
      x[i] = 0;
    }
    return x;
  };

  var getLength = function (a, length) {
    var k = length;
    while (k > 0 && a[k - 1] === 0) {
      k -= 1;
    }
    return k;
  };

  var performMultiplication = function (carry, a, b, result, index) {
    var c = carry + a * b;
    var q = floor(c / base);
    result[index] = (c - q * base);
    return q;
  };

  var performDivision = function (a, b, divisor, result, index) {
    var carry = a * base + b;
    var q = floor(carry / divisor);
    result[index] = q;
    return (carry - q * divisor);
  };

  var checkRadix = function (radix) {
    if (radix < 2 || radix > 36) {
      throw new RangeError("radix argument must be between 2 and 36");
    }
  };

  var convertRadix = function (magnitude, size, radix) {
    var i = -1;
    while (++i < size) {
      var j = -1;
      var c = magnitude[i];
      magnitude[i] = 0;
      while (++j < i + 1) {
        c = performMultiplication(c, magnitude[j], radix, magnitude, j);
      }
    }
  };

  // BigInteger(String[, radix = 10]), (2 <= radix <= 36)
  // throws RangeError, TypeError
  function BigInteger(s, radix, m) {
    if (typeof s !== "string") {
      throw new TypeError();
    }
    var sign = 1;
    var magnitude = null;
    var magnitudeLength = 0;
    if (m !== undefined) {
      sign = radix < 0 ? -1 : 1;
      magnitude = m;
      magnitudeLength = sign * radix;
    } else {
      if (radix === undefined) {
        radix = 10;
      }
      if (typeof radix !== "number" || floor(radix) !== radix) {
        throw new TypeError();
      }
      checkRadix(radix);
      var length = s.length;
      if (length === 0) {
        throw new RangeError();
      }
      var signCharCode = s.charCodeAt(0);
      var from = 0;
      if (signCharCode === 43) { // "+"
        from = 1;
      }
      if (signCharCode === 45) { // "-"
        from = 1;
        sign = -1;
      }

      length -= from;
      if (length === 0) {
        throw new RangeError();
      }

      var groupLength = 0;
      var groupRadix = 1;
      var y = floor(base / radix);
      while (y >= groupRadix && groupLength < length) {
        groupLength += 1;
        groupRadix *= radix;
      }
      var size = -floor(-length / groupLength);

      magnitude = createArray(size);
      var k = size;
      var i = length;
      while (i > 0) {
        magnitude[--k] = parseInteger(s, from + (i > groupLength ? i - groupLength : 0), from + i, radix);
        i -= groupLength;
      }

      convertRadix(magnitude, size, groupRadix);
      magnitudeLength = getLength(magnitude, size);
    }
    this.signum = magnitudeLength === 0 ? 0 : sign;
    this.magnitude = magnitude;
    this.length = magnitudeLength;
  }

  var createBigInteger = function (signum, magnitude, length) {
    return new BigInteger("", signum * length, magnitude);
  };

  var compareMagnitude = function (aMagnitude, aLength, bMagnitude, bLength) {
    if (aLength !== bLength) {
      return aLength < bLength ? -1 : +1;
    }
    var i = aLength;
    while (--i >= 0) {
      if (aMagnitude[i] !== bMagnitude[i]) {
        return aMagnitude[i] < bMagnitude[i] ? -1 : +1;
      }
    }
    return 0;
  };

  var compareTo = function (aSignum, aMagnitude, aLength, bSignum, bMagnitude, bLength) {
    if (aSignum === bSignum) {
      var c = compareMagnitude(aMagnitude, aLength, bMagnitude, bLength);
      if (c === 0) {
        return c; // positive zero
      }
      return aSignum * c;
    }
    if (aSignum === 0) {
      return -bSignum;
    }
    return aSignum;
  };

  var add = function (aSignum, aMagnitude, aLength, bSignum, bMagnitude, bLength) {
    var z = compareMagnitude(aMagnitude, aLength, bMagnitude, bLength);
    if (z > 0) {
      return add(bSignum, bMagnitude, bLength, aSignum, aMagnitude, aLength);
    }
    // |a| <= |b|
    if (aSignum === 0) {
      return createBigInteger(bSignum, bMagnitude, bLength);
    }
    var subtract = false;
    if (aSignum !== bSignum) {
      if (z === 0) { // a === (-b)
        return createBigInteger(0, createArray(0), 0);
      }
      subtract = true;
      if (aLength === bLength) {
        while (bLength > 0 && aMagnitude[bLength - 1] === bMagnitude[bLength - 1]) {
          bLength -= 1;
        }
      }
    }
    // result !== 0
    var resultLength = bLength + (subtract ? 0 : 1);
    var result = createArray(resultLength);
    var i = -1;
    var c = 0;
    while (++i < bLength) {
      c += (i < aLength ? (subtract ? bMagnitude[i] - aMagnitude[i] : bMagnitude[i] + aMagnitude[i]) : bMagnitude[i]);
      if (c < 0) {
        result[i] = base + c;
        c = -1;
      } else if (c < base) {
        result[i] = c;
        c = 0;
      } else {
        result[i] = c - base;
        c = +1;
      }
    }
    if (c !== 0) {
      result[bLength] = c;
    }
    return createBigInteger(bSignum, result, getLength(result, resultLength));
  };

  var multiply = function (aSignum, aMagnitude, aLength, bSignum, bMagnitude, bLength) {
    if (aLength === 0 || bLength === 0) {
      return createBigInteger(0, createArray(0), 0);
    }
    var resultSign = aSignum * bSignum;
    if (aLength === 1 && aMagnitude[0] === 1) {
      return createBigInteger(resultSign, bMagnitude, bLength);
    }
    if (bLength === 1 && bMagnitude[0] === 1) {
      return createBigInteger(resultSign, aMagnitude, aLength);
    }
    var resultLength = aLength + bLength;
    var result = createArray(resultLength);
    var i = -1;
    while (++i < bLength) {
      var c = 0;
      var j = -1;
      while (++j < aLength) {
        c = performMultiplication(c + result[j + i], aMagnitude[j], bMagnitude[i], result, j + i);
      }
      result[aLength + i] = c;
    }
    return createBigInteger(resultSign, result, getLength(result, resultLength));
  };

  var divideBySmall = function (magnitude, length, lambda) {
    var c = 0;
    var i = length;
    while (--i >= 0) {
      c = performDivision(c, magnitude[i], lambda, magnitude, i);
    }
    return c;
  };

  var multiplyBySmall = function (magnitude, length, lambda) {
    var c = 0;
    var i = -1;
    while (++i < length) {
      c = performMultiplication(c, magnitude[i], lambda, magnitude, i);
    }
    magnitude[length] = c;
  };

  var divideAndRemainder = function (aSignum, aMagnitude, aLength, bSignum, bMagnitude, bLength, divide) {
    if (bLength === 0) {
      throw new RangeError();
    }
    if (aLength === 0) {
      return createBigInteger(0, createArray(0), 0);
    }
    if (bLength === 1 && bMagnitude[0] === 1) {
      return divide ? createBigInteger(aSignum === 0 ? 0 : aSignum * bSignum, aMagnitude, aLength) : createBigInteger(0, createArray(0), 0);
    }

    var divisorOffset = aLength + 1;
    var divisorAndRemainder = createArray(divisorOffset + bLength + 1); // `+ 1` to avoid `index < remainder.length` and for extra digit in case of normalization
    var divisor = divisorAndRemainder;
    var remainder = divisorAndRemainder;
    var n = aLength;
    while (--n >= 0) {
      remainder[n] = aMagnitude[n];
    }
    var m = bLength;
    while (--m >= 0) {
      divisor[divisorOffset + m] = bMagnitude[m];
    }

    var top = divisor[divisorOffset + bLength - 1];

    // normalization
    var lambda = 1;
    if (bLength > 1) {
      //lambda = -floor(-floor(base / 2) / top);
      lambda = floor(base / (top + 1));
      if (lambda > 1) {
        multiplyBySmall(divisorAndRemainder, divisorOffset + bLength, lambda);
        top = divisor[divisorOffset + bLength - 1];
      }
      if (top < floor(base / 2)) {
        throw new RangeError();
      }
    }

    var shift = aLength - bLength + 1;
    if (shift < 0) {
      shift = 0;
    }
    var quotinent = null;
    var quotinentLength = 0;

    var i = shift;
    while (--i >= 0) {
      var t = bLength + i;
      var tmp = remainder[t];
      performDivision(remainder[t], remainder[t - 1], top, remainder, t);
      var q = remainder[t];
      remainder[t] = tmp;

      var ax = 0;
      var bx = 0;
      var j = i - 1;
      while (++j <= t) {
        var rj = remainder[j];
        bx = performMultiplication(bx, q, divisor[divisorOffset + j - i], remainder, j);
        ax += rj - remainder[j];
        if (ax < 0) {
          remainder[j] = base + ax;
          ax = -1;
        } else {
          remainder[j] = ax;
          ax = 0;
        }
      }
      while (ax !== 0) {
        q -= 1;
        var c = 0;
        var k = i - 1;
        while (++k <= t) {
          c += remainder[k] + divisor[divisorOffset + k - i];
          if (c < base) {
            remainder[k] = c;
            c = 0;
          } else {
            remainder[k] = c - base;
            c = +1;
          }
        }
        ax += c;
      }
      if (divide && q !== 0) {
        if (quotinent === null) {
          quotinentLength = i + 1;
          quotinent = createArray(quotinentLength);
        }
        quotinent[i] = q;
      }
    }

    if (divide) {
      if (quotinent === null) {
        return createBigInteger(0, createArray(0), 0);
      }
      return createBigInteger(aSignum * bSignum, quotinent, quotinentLength);
    }

    var remainderLength = aLength + 1;
    if (lambda > 1) {
      divideBySmall(remainder, remainderLength, lambda);
    }
    while (remainderLength > 0 && remainder[remainderLength - 1] === 0) {
      remainderLength -= 1;
    }
    if (remainderLength === 0) {
      return createBigInteger(0, createArray(0), 0);
    }
    var result = createArray(remainderLength);
    var o = remainderLength;
    while (--o >= 0) {
      result[o] = remainder[o];
    }
    return createBigInteger(aSignum, result, remainderLength);
  };

  var toString = function (signum, magnitude, length, radix) {
    var result = signum < 0 ? "-" : "";

    var remainderLength = length;
    if (remainderLength === 0) {
      return "0";
    }
    if (remainderLength === 1) {
      result += magnitude[0].toString(radix);
      return result;
    }
    var groupLength = 0;
    var groupRadix = 1;
    var y = floor(base / radix);
    while (y >= groupRadix) {
      groupLength += 1;
      groupRadix *= radix;
    }
    var size = remainderLength - floor(-remainderLength / groupLength);
    var remainder = createArray(size);
    var n = -1;
    while (++n < remainderLength) {
      remainder[n] = magnitude[n];
    }

    var k = size;
    while (remainderLength !== 0) {
      var q = divideBySmall(remainder, remainderLength, groupRadix);
      while (remainderLength !== 0 && remainder[remainderLength - 1] === 0) {
        remainderLength -= 1;
      }
      remainder[--k] = q;
    }
    result += remainder[k].toString(radix);
    while (++k < size) {
      var t = remainder[k].toString(radix);
      var j = groupLength - t.length;
      while (--j >= 0) {
        result += "0";
      }
      result += t;
    }
    return result;
  };

  BigInteger.prototype = {

    compareTo: function (b) {
      return compareTo(this.signum, this.magnitude, this.length, b.signum, b.magnitude, b.length);
    },

    negate: function () {
      return createBigInteger(0 - this.signum, this.magnitude, this.length);
    },

    add: function (b) {
      return add(this.signum, this.magnitude, this.length, b.signum, b.magnitude, b.length);
    },

    subtract: function (b) {
      return add(this.signum, this.magnitude, this.length, 0 - b.signum, b.magnitude, b.length);
    },

    multiply: function (b) {
      return multiply(this.signum, this.magnitude, this.length, b.signum, b.magnitude, b.length);
    },

    divide: function (b) {
      return divideAndRemainder(this.signum, this.magnitude, this.length, b.signum, b.magnitude, b.length, true);
    },

    remainder: function (b) {
      return divideAndRemainder(this.signum, this.magnitude, this.length, b.signum, b.magnitude, b.length, false);
    },

    toString: function (radix) {
      if (radix === undefined) {
        radix = 10;
      }
      if (typeof radix !== "number" || floor(radix) !== radix) {
        throw new TypeError();
      }
      checkRadix(radix);
      return toString(this.signum, this.magnitude, this.length, radix);
    }

  };

  var ZERO = createBigInteger(0, createArray(0), 0);
  var oneMagnitude = createArray(1);
  oneMagnitude[0] = 1;
  var ONE = createBigInteger(1, oneMagnitude, 1);

  BigInteger.ZERO = ZERO;
  BigInteger.ONE = ONE;
  exports.BigInteger = BigInteger;

}(this));

/*jslint plusplus: true, vars: true, indent: 2 */
/*global BigInteger, Matrix */

/*

  Matrix * Integer -> Matrix
  Matrix / Integer -> Matrix
  Matrix + Integer -> Matrix

  Matrix * Symbol -> Matrix
  Matrix / Symbol -> Matrix
  Matrix + Symbol -> Matrix

*/

// Thanks to Eduardo Cavazos
// see also https://github.com/dharmatech/Symbolism/blob/master/Symbolism/Symbolism.cs

(function (global) {
  "use strict";

  var stdObjectCreate = function (proto) {
    var F = function () {
    };
    F.prototype = proto;
    return new F();
  };

  function ArithmeticException() {
    Function.prototype.apply.call(RangeError, this);
  }

  ArithmeticException.prototype = stdObjectCreate(RangeError.prototype);

  global.ArithmeticException = ArithmeticException;

  //TODO: rename Symbol

  var pow = function (x, count, accumulator) {
    if (count < 0) {
      throw new RangeError();
    }
    return (count < 1 ? accumulator : (Math.floor(count / 2) * 2 !== count ? pow(x, count - 1, accumulator.multiply(x)) : pow(x.multiply(x), Math.floor(count / 2), accumulator)));
  };

  var transformExponentiation = function (x, y) {
    if (!Expression.simplification) {
      return new Exponentiation(x, y);
    }
    
    //!
    if (y instanceof Division && y.a instanceof Integer && y.b instanceof Integer && y.b.bigInteger.compareTo(BigInteger.ONE.add(BigInteger.ONE)) === 0) {
      //?
      return transformMultiplication(transformExponentiation(x, y.a.subtract(Integer.ONE).divide(y.b)), Expression.transformSquareRoot(x));
    }
    //!

    if (!(y instanceof Integer)) {
      throw new UserError();
    }
    if (y.equals(Integer.ZERO)) {
      if (x instanceof ExpressionMatrix) {
        return Matrix.I(x.matrix.rows());
      }
      return Integer.ONE;
    }
    if (y.equals(Integer.ONE)) {
      return x;
    }
    if (y.bigInteger.compareTo(BigInteger.ZERO) < 0) {
      return transformDivision(Integer.ONE, transformExponentiation(x, new Integer(y.bigInteger.negate())));
    }

    if (x instanceof ExpressionMatrix) {
      return new ExpressionMatrix(pow(x.matrix, Number(y.bigInteger.toString()), Matrix.I(x.matrix.rows())));
    }

    if (x instanceof Symbol) {
      return new Exponentiation(x, y);
    }
    if (x instanceof Exponentiation) {
      return transformExponentiation(x.a, x.b.multiply(y));
    }
    // assert(x instanceof Operation || x instanceof Integer);
    return pow(x, Number(y.bigInteger.toString()), Integer.ONE);
  };

  var getLast = function (x) {
    return x instanceof Multiplication ? x.b : x;
  };
  var getRest = function (x) {
    return x instanceof Multiplication ? x.a : null;
  };
  var compare = function (x, y) {
    if (x instanceof Symbol && y instanceof Integer) {
      return +1;
    }
    if (x instanceof Integer && y instanceof Symbol) {
      return -1;
    }
    if (x instanceof Integer && y instanceof Integer) {
      return x.bigInteger.compareTo(y.bigInteger);
    }
    if (x instanceof Symbol && y instanceof Symbol) {
      return x.symbol < y.symbol ? -1 : (y.symbol < x.symbol ? +1 : 0);
    }
    throw new TypeError({x: x, y: y});
  };
  var getBase = function (x) {
    return x instanceof Exponentiation ? x.a : x;
  };
  var getExponent = function (x) {
    return x instanceof Exponentiation ? x.b : Integer.ONE;
  };

  var mergeMultiplication = function (x, y) {
    if (x === null) {
      return y;
    }
    if (y === null) {
      return x;
    }
    var fx = getLast(x);
    var fy = getLast(y);
    var rx = getRest(x);
    var ry = getRest(y);
    //!
    var cmp = 0;
    if (fx instanceof Integer || fy instanceof Integer) {
      if (fx instanceof Integer && fx.bigInteger.compareTo(BigInteger.ZERO) === 0) {
        return fx;
      }
      if (fx instanceof Integer && fx.bigInteger.compareTo(BigInteger.ONE) === 0) {
        return rx === null ? y : transformMultiplication(rx, y);
      }
      if (fy instanceof Integer && fy.bigInteger.compareTo(BigInteger.ZERO) === 0) {
        return fy;
      }
      if (fy instanceof Integer && fy.bigInteger.compareTo(BigInteger.ONE) === 0) {
        return ry === null ? x : transformMultiplication(x, ry);
      }

      if (fy instanceof Integer && fx instanceof Integer) {
        var rest = mergeMultiplication(rx, ry);
        var current = new Integer(fx.bigInteger.multiply(fy.bigInteger));
        return rest === null ? current : transformMultiplication(rest, current);
      } else if (fy instanceof Integer) {
        cmp = +1;
      } else {
        cmp = -1;
      }
    } else if (fx instanceof Expression.SquareRoot || fy instanceof Expression.SquareRoot) {
      if (fy instanceof Integer) {
        cmp = +1;
      } else if (fx instanceof Integer) {
        cmp = -1;
      } else if (fx instanceof Symbol) {
        cmp = +1;
      } else if (fy instanceof Symbol) {
        cmp = -1;
      } else if (fx instanceof Expression.SquareRoot && fy instanceof Expression.SquareRoot) {
        var rest = mergeMultiplication(rx, ry);
        var current = Expression.transformSquareRoot(new Integer(fx.a.bigInteger.multiply(fy.a.bigInteger)));
        return rest === null ? current : transformMultiplication(rest, current);
      } else if (fx instanceof Exponentiation) {
        cmp = +1;
      } else if (fy instanceof Exponentiation) {
        cmp = -1;
      } else {
        throw new TypeError({x: x, y: y});
      }
      //!
    } else {
      cmp = compare(getBase(fx), getBase(fy));
    }
    if (cmp === 0) {
      var rest = mergeMultiplication(rx, ry);
      var current = transformExponentiation(getBase(fx), getExponent(fx).add(getExponent(fy)));
      return rest === null ? current : transformMultiplication(rest, current);
    }
    if (cmp < 0) {
      var rest = mergeMultiplication(x, ry);
      return rest.equals(Integer.ZERO) ? rest : (rest.equals(Integer.ONE) ? fy : new Multiplication(rest, fy));
    }
    var rest = mergeMultiplication(rx, y);
    return rest.equals(Integer.ZERO) ? rest : (rest.equals(Integer.ONE) ? fx : new Multiplication(rest, fx));
  };
  var getConstant = function (x) {
  // TODO: fix performance ?
    var iterator = new MultiplicationIterator(x);
    var result = null;
    while ((result = iterator.next()) !== null) {
      if (result instanceof Integer) {
        return result;
      }
    }
    return Integer.ONE;
    //return x instanceof Integer ? x : (x instanceof Multiplication && x.a instanceof Integer ? x.a : Integer.ONE);
  };
  var getTerm = function (x) {
  // TODO: fix performance ?
    var iterator = new MultiplicationIterator(x);
    var results = [];
    var result = null;
    while ((result = iterator.next()) !== null) {
      if (!(result instanceof Integer)) {
        results.push(result);
      }
    }
    var i = results.length - 1;
    if (i === -1) {
      return null;
    }
    result = results[i];
    while (--i >= 0) {
      result = new Multiplication(result, results[i]);
    }
    return result;  
    //return x instanceof Integer ? null : (x instanceof Multiplication && x.a instanceof Integer ? x.b : x);
  };
  var transformMultiplication = function (x, y) {
    checkExpression(x);
    checkExpression(y);
    if (!Expression.simplification) {
      return new Multiplication(x, y);
    }

    //if (Expression.getIdentityMatrixCoefficient(x) !== null && Expression.getIdentityMatrixCoefficient(y) !== null) {
    //  return Expression.makeIdentityMatrixWithCoefficient(transformMultiplication(Expression.getIdentityMatrixCoefficient(x), Expression.getIdentityMatrixCoefficient(y)));
    //}
    //if (Expression.getIdentityMatrixCoefficient(x) !== null) {
    //  if (y instanceof ExpressionMatrix) {
    //    return transformMultiplication(Expression.getIdentityMatrixCoefficient(x), y);
    //  }
    //  return Expression.makeIdentityMatrixWithCoefficient(transformMultiplication(Expression.getIdentityMatrixCoefficient(x), y));
    //}
    //if (Expression.getIdentityMatrixCoefficient(y) !== null) {
    //  if (x instanceof ExpressionMatrix) {
    //    return transformMultiplication(x, Expression.getIdentityMatrixCoefficient(y));
    //  }
    //  return Expression.makeIdentityMatrixWithCoefficient(transformMultiplication(x, Expression.getIdentityMatrixCoefficient(y)));
    //}

    if (x instanceof ExpressionMatrix && y instanceof ExpressionMatrix) {
      return new ExpressionMatrix(x.matrix.multiply(y.matrix));
    }
    if (x instanceof ExpressionMatrix) {
      return new ExpressionMatrix(x.matrix.scale(y));
    }
    if (y instanceof ExpressionMatrix) {
      return new ExpressionMatrix(y.matrix.scale(x));
    }

    // /
    if (x instanceof Division) {
      return transformDivision(transformMultiplication(x.a, y), x.b);
    }
    if (y instanceof Division) {
      return transformDivision(transformMultiplication(x, y.a), y.b);    
    }
    // +
    if (x instanceof Addition) {
      return transformAddition(transformMultiplication(x.a, y), transformMultiplication(x.b, y));
    }
    if (y instanceof Addition) {
      return transformAddition(transformMultiplication(x, y.a), transformMultiplication(x, y.b));
    }
    // rest

    return mergeMultiplication(x, y);
  };

  var getLastAdditionOperand = function (x) {
    return x instanceof Addition ? x.b : x;
  };
  var getRestAdditionOperand = function (x) {
    return x instanceof Addition ? x.a : null;
  };
  var compare4Addition = function (x, y) {
    // null | Symbol | Exponentiation | Multiplication
    var xIterator = new MultiplicationIterator(x);
    var yIterator = new MultiplicationIterator(y);
    while (true) {
      var fx = xIterator.next();
      var fy = yIterator.next();
      if (fx === null && fy === null) {
        return 0;
      }
      if (fx === null) {
        return -1;
      }
      if (fy === null) {
        return +1;
      }

      //!
      var cmp = 0;
      if (fx instanceof Expression.SquareRoot || fy instanceof Expression.SquareRoot) {
        if (fx instanceof Expression.SquareRoot && fy instanceof Expression.SquareRoot) {
          cmp = -fx.a.bigInteger.compareTo(fy.a.bigInteger);
        } else if (fx instanceof Integer || fy instanceof Symbol || fy instanceof Exponentiation) {
          cmp = -1;
        } else if (fy instanceof Integer || fx instanceof Symbol || fx instanceof Exponentiation) {
          cmp = +1;
        } else {
          throw new TypeError();//?
        }
      } else {
        // x^3*y^2, x^2*y^3
        cmp = -compare(getBase(fx), getBase(fy));
        if (cmp === 0) {
          cmp = compare(getExponent(fx), getExponent(fy));
        }
      }
      if (cmp !== 0) {
        return cmp;
      }
    }
  };
  var transformAddition = function (x, y) {
    if (!Expression.simplification) {
      return new Addition(x, y);
    }

    //if (Expression.getIdentityMatrixCoefficient(x) !== null && Expression.getIdentityMatrixCoefficient(y) !== null) {
    //  return Expression.makeIdentityMatrixWithCoefficient(transformAddition(Expression.getIdentityMatrixCoefficient(x), Expression.getIdentityMatrixCoefficient(y)), Expression.IdentityMatrix);
    //}
    //if (Expression.getIdentityMatrixCoefficient(x) !== null) {
    //  if (y instanceof ExpressionMatrix) {
    //    return transformAddition(new ExpressionMatrix(Matrix.I(Math.max(y.matrix.rows(), y.matrix.cols())).multiply(Expression.getIdentityMatrixCoefficient(x))), y);
    //  }
    //  throw new UserError();
    //}
    //if (Expression.getIdentityMatrixCoefficient(y) !== null) {
    //  if (x instanceof ExpressionMatrix) {
    //    return transformAddition(new ExpressionMatrix(x, Matrix.I(Math.max(y.matrix.rows(), y.matrix.cols())).multiply(Expression.getIdentityMatrixCoefficient(y))));
    //  }
    //  throw new UserError();
    //}

    if (x instanceof ExpressionMatrix && y instanceof ExpressionMatrix) {
      return new ExpressionMatrix(x.matrix.add(y.matrix));
    }
    if (x instanceof ExpressionMatrix || y instanceof ExpressionMatrix) {
      throw new UserError();
    }

    // /f
    if (x instanceof Division) {
      return transformDivision(transformAddition(x.a, y.multiply(x.b)), x.b);
    }
    if (y instanceof Division) {
      return transformDivision(transformAddition(x.multiply(y.b), y.a), y.b);
    }
    // rest
    var fx = getLastAdditionOperand(x);
    var fy = getLastAdditionOperand(y);
    var rx = getRestAdditionOperand(x);
    var ry = getRestAdditionOperand(y);
    var cmp = compare4Addition(getTerm(fx), getTerm(fy));
    if (cmp === 0) {
      var c = getConstant(fx).bigInteger.add(getConstant(fy).bigInteger);
      var rest = rx === null ? ry : ry === null ? rx : transformAddition(rx, ry);
      var last = getTerm(fx) === null ? new Integer(c) : transformMultiplication(new Integer(c), getTerm(fx));
      return rest === null ? last : transformAddition(rest, last);
    }
    if (cmp > 0) {
      var tmp = fx;
      fx = fy;
      fy = tmp;
      tmp = rx;
      rx = ry;
      ry = rx;
      tmp = x;
      x = y;
      y = tmp;
    }
    var last = fx;
    var rest = rx === null ? y : transformAddition(rx, y);
    if (last.equals(Integer.ZERO)) {
      return rest === null ? last : rest;
    }
    //?
    if (rest.equals(Integer.ZERO)) {
      return last;
    }
    return new Addition(rest, last);
  };

  var checkMultivariatePolynomial = function (e, d) {
    return true;
  //TODO: FIX!!!
    if (d < 1 && e instanceof Addition) {
      return checkMultivariatePolynomial(e.a, 0) && checkMultivariatePolynomial(e.b, 1);
    }
    if (d < 2 && e instanceof Integer) {
      return true;
    }
    if (d < 2 && e instanceof Multiplication && (e.a instanceof Integer || e.a instanceof Symbol)) {
      return checkMultivariatePolynomial(e.b, 2);
    }
    if (d < 3 && e instanceof Multiplication) {
      return (e.a instanceof Symbol) && checkMultivariatePolynomial(e.b, 2);
    }
    if (d < 4 && e instanceof Exponentiation) {
      return (e.a instanceof Symbol) && (e.b instanceof Integer) && e.b.bigInteger.compareTo(BigInteger.ZERO) > 0;
    }
    if (e instanceof Symbol) {
      return true;
    }
    return false;
  };

  var pseudoRemainder = function (x, y, v) {
    var lcg = getLeadingCoefficient(y, v);
    var x1 = getLargestExponent(x, v).subtract(getLargestExponent(y, v)).add(BigInteger.ONE);
    // assertion
    if (x1.compareTo(BigInteger.ONE) < 0) {
      throw new Error();
    }
    x = x.multiply(lcg.pow(new Integer(x1)));
    return divideAndRemainder(x, y, v)[1];
  };

  var divideAndRemainder = function (x, y, v) {
    if (y.equals(Integer.ZERO)) {
      throw new ArithmeticException("Division by zero in function divideAndRemainder");//!TODO: fix
    }
    var div = Integer.ZERO;
    var rem = x;
    var e0 = null;
    var e1 = null;
    // compareTo for BigIntegers
    while (!rem.equals(Integer.ZERO) && (e0 = getLeadingX(rem, v)).exponent.compareTo((e1 = getLeadingX(y, v)).exponent) >= 0) {
      var n = e0.exponent.subtract(e1.exponent);

      var d = e0.coefficient.divide(e1.coefficient);
      if (d instanceof Division) {
        throw new Error(); // AssertionError
      }
      var q = d.multiply(v.pow(new Integer(n)));
      div = div.add(q);
      rem = rem.subtract(y.multiply(q));
    }
    return [div, rem];
  };

  var divide2 = function (x, y, v) {
    if (y.equals(Integer.ZERO)) {
      throw new ArithmeticException("Division by zero in function divideAndRemainder");//!TODO: fix
    }
    var div = Integer.ZERO;
    var rem = x;
    // compareTo for BigIntegers
    while (!rem.equals(Integer.ZERO) && getLargestExponent(rem, v).compareTo(getLargestExponent(y, v)) >= 0) {
      var n = getLargestExponent(rem, v).subtract(getLargestExponent(y, v));

      var d = getLeadingCoefficient(rem, v).divide(getLeadingCoefficient(y, v));
      if (d instanceof Division) {
        return null;
      }
      var q = d.multiply(v.pow(new Integer(n)));
      div = div.add(q);
      rem = rem.subtract(y.multiply(q));
    }
    return rem.equals(Integer.ZERO) ? div : null;
  };

  var divideByInteger = function (x, f) {
    if (f.equals(Integer.ZERO)) {
      throw new ArithmeticException("Division by zero in function divideAndRemainder");//!TODO: fix
    }
    var result = Integer.ZERO;
    while (x !== null) {
      var fx = getLastAdditionOperand(x);
      var rx = getRestAdditionOperand(x);
      var rest = Integer.ONE;
      var t = null;
      var iterator = new MultiplicationIterator(fx);
      var z = null;
      // TODO: check, fix?
      while ((z = iterator.next()) !== null) {
        if (z instanceof Integer) {
          t = z;
        } else {
          if (rest === Integer.ONE) {
            rest = z;
          } else {
            rest = transformMultiplication(z, rest);
          }
        }
      }
      //var t = getLast(fx);
      if (!(t instanceof Integer)) {
        throw new Error("!");
      }
      //var rest = getRest(fx);
      //if (rest === null) {
      //  rest = Integer.ONE;
      //}
      result = transformAddition(result, transformMultiplication(new Integer(t.bigInteger.divide(f.bigInteger)), rest));
      x = rx;
    }
    return result;
  };

  // returns BigInteger
  var getLeadingX = function (x, v) {
    var coefficients = getCoefficients(x, v);
    return coefficients[coefficients.length - 1];
  };

  var getLeadingCoefficient = function (x, v) {
    return getLeadingX(x, v).coefficient;
  };

  // returns BigInteger
  var getLargestExponent = function (x, v) {
    return getLeadingX(x, v).exponent;
  };

  var getCoefficients = function (x, v) {
    var result = [];
    while (x !== null) {
      var fx = getLastAdditionOperand(x);
      x = getRestAdditionOperand(x);
      var e = BigInteger.ZERO;
      var c = Integer.ONE;
      var fxIterator = new MultiplicationIterator(fx);
      var t = null;
      while ((t = fxIterator.next()) !== null) {
        if (getBase(t).equals(v)) {
          e = e.add(getExponent(t).bigInteger);
        } else {
          c = c.multiply(t);
        }
      }
      var tmp = {
        coefficient: c,
        exponent: e
      };
      var k = result.length - 1;
      while (k >= 0 && tmp.exponent.compareTo(result[k].exponent) < 0) {
        k -= 1;
      }
      if (k >= 0 && tmp.exponent.compareTo(result[k].exponent) === 0) {
        result[k].coefficient = tmp.coefficient.add(result[k].coefficient);
      } else {
        result.push(tmp);
        var i = result.length - 1;
        while (i >= k + 2) {
          result[i] = result[i - 1];
          i -= 1;
        }
        result[k + 1] = tmp;
      }
    }
    if (result.length === 0) {
      //TODO: remove?
      result.push({
        coefficient: Integer.ZERO,
        exponent: BigInteger.ZERO
      });
    }
    return result;
  };

  var getLastMultiplicationOperand = function (x) {
    var result = x;
    while (result instanceof Multiplication) {
      result = result.b;
    }
    return result;
  };

  var getVariable = function (e) {
    //? square roots at first
    var additions = new AdditionIterator(e);
    var x = null;
    while ((x = additions.next()) !== null) {
      var multiplications = new MultiplicationIterator(x);
      var y = null;
      while ((y = multiplications.next()) !== null) {
        if (y instanceof Expression.SquareRoot) {
        //TODO: assert(y instanceof Integer)
          return y;
        }
      }
    }
    //?
  
    if (e instanceof Addition) {
      return getVariable(getRestAdditionOperand(e));
    }
    var result = getBase(getLastMultiplicationOperand(e));
    //!?
    //if (result instanceof Expression.SquareRoot) {
    //  return null;
    //}
    //
    return result instanceof Integer ? null : result;
  };

  var content = function (x, v) {
    var coefficients = getCoefficients(x, v);
    var i = coefficients.length;
    var cx = null;
    var vcx = null;
    while (--i >= 0) {
      var c = coefficients[i];
      vcx = vcx === null ? getVariable(c.coefficient) : vcx;
      cx = cx === null ? c.coefficient : gcd(cx, c.coefficient, vcx);
    }
    return cx;
  };

  var pp = function (x, v) {
    var c = content(x, v);
    return divideAndRemainder(x, c, v)[0];
  };

  var bigIntegerGCD = function (a, b) {
    if (a.compareTo(BigInteger.ZERO) < 0) {
      a = a.negate();
    }
    if (b.compareTo(BigInteger.ZERO) < 0) {
      b = b.negate();
    }
    var t = null;
    while (b.compareTo(BigInteger.ZERO) !== 0) {
      t = a.remainder(b);
      a = b;
      b = t;
    }
    return a;
  };

  // http://www-troja.fjfi.cvut.cz/~liska/ca/node33.html
  var gcd = function (a, b, v) {
    if (v === null) {
      if (getVariable(a) !== null) {
      //?
        return gcd(a, b, getVariable(a));
      }
      if (getVariable(b) !== null) {
        return gcd(a, b, getVariable(b));      
      }
      var contentA = content(a, v);
      var contentB = content(b, v);
      return new Integer(bigIntegerGCD(getConstant(contentA).bigInteger, getConstant(contentB).bigInteger));
    }

    //TODO: fix (place condition for degrees earlier - ?)
    if (getLargestExponent(a, v).compareTo(getLargestExponent(b, v)) < 0) {
      //!!!
      var tmp = a;
      a = b;
      b = tmp;
    }

    var contentA = content(a, v);
    var contentB = content(b, v);
    var ppA = divideAndRemainder(a, contentA, v)[0];
    var ppB = divideAndRemainder(b, contentB, v)[0];
    var A = ppA;
    var B = ppB;
    while (!B.equals(Integer.ZERO)) {
      var r = pseudoRemainder(A, B, v);
      A = B;
      B = r;
    }
    return gcd(contentA, contentB, getVariable(contentA)).multiply(pp(A, v));
  };

  // ! new 21.12.2013 (square roots)
  var AdditionIterator = function (e) {
    this.e = e;
  };

  AdditionIterator.prototype.next = function () {
    if (this.e === null) {
      return null;
    }
    var x = getLastAdditionOperand(this.e);
    this.e = getRestAdditionOperand(this.e);
    return x;
  };

  var MultiplicationIterator = function (e) {
    this.e = e;
  };

  MultiplicationIterator.prototype.next = function () {
    if (this.e === null) {
      return null;
    }
    var x = getLast(this.e);
    this.e = getRest(this.e);
    return x;
  };

  var getConjugateFactor = function (a) {
    var p = null;
    var additions = new AdditionIterator(a);
    var x = null;
    while ((x = additions.next()) !== null) {
      var multiplications = new MultiplicationIterator(x);
      var y = null;
      while ((y = multiplications.next()) !== null) {
        if (y instanceof Expression.SquareRoot) {
        //TODO: assert(y instanceof Integer)
          if (p === null) {
            p = new Integer(y.a.bigInteger);
          } else {
            var z = bigIntegerGCD(p.bigInteger, y.a.bigInteger);
            if (z.compareTo(BigInteger.ONE) !== 0) {
              p = new Integer(z);//!
            }
          }
        }
      }
    }
    return p;
  };

  // TODO: test
  var getConjugate = function (a) {
  //TODO: fix
  //if (true) return null;
    var p = getConjugateFactor(a);
    // make up - v
    if (p === null) {
      return null;
    }
    var up = Integer.ZERO;
    var v = Integer.ZERO;
    var additions = new AdditionIterator(a);
    var x = null;
    while ((x = additions.next()) !== null) {
      var multiplications = new MultiplicationIterator(x);
      var y = null;
      var ok = false;
      while ((y = multiplications.next()) !== null) {
        if (y instanceof Expression.SquareRoot) {
          var z = bigIntegerGCD(p.bigInteger, y.a.bigInteger);
          if (z.compareTo(BigInteger.ONE) !== 0) {
            ok = true;
          }
        }
      }
      if (ok) {
        up = up.add(x);
      } else {
        v = v.add(x);
      }
    }
    return up.subtract(v);
  };

  Expression.fillLinearEquationVariablesMap = function (e, map) {
    if (e instanceof Division) {
      throw new Error();
    }
    var additions = new AdditionIterator(e);
    var x = null;
    while ((x = additions.next()) !== null) {
      var multiplications = new MultiplicationIterator(x);
      var y = null;
      var v = null;
      var c = Integer.ONE;
      while ((y = multiplications.next()) !== null) {
        if (y instanceof Expression.Exponentiation) {
          throw new Error();//?
        } else if (y instanceof Expression.Symbol) {
          if (v !== null) {
            throw new Error();
          }
          v = y;
        } else {
          if (!(y instanceof Integer)) {//TODO: sqrt ?!?;
            throw new Error();
          }
          c = c.multiply(y);
        }
      }
      var variable = v === null ? "" : v.toString();
      if (map.get(variable) === undefined) {
        map.set(variable, c);
      } else {
        map.set(variable, map.get(variable).add(c));
      }
    }
  };

  var transformDivision = function (x, y, allowConjugate) {
    allowConjugate = allowConjugate === undefined ? true : allowConjugate;
    if (!Expression.simplification) {
      return new Division(x, y);
    }

    //if (Expression.getIdentityMatrixCoefficient(x) !== null && Expression.getIdentityMatrixCoefficient(y) !== null) {
    //  return Expression.makeIdentityMatrixWithCoefficient(transformDivision(Expression.getIdentityMatrixCoefficient(x), Expression.getIdentityMatrixCoefficient(y)));
    //}
    //if (Expression.getIdentityMatrixCoefficient(x) !== null) {
    //  if (y instanceof ExpressionMatrix) {
    //    return transformDivision(Expression.getIdentityMatrixCoefficient(x), y);
    //  }
    //  return Expression.makeIdentityMatrixWithCoefficient(transformDivision(Expression.getIdentityMatrixCoefficient(x), y));
    //}
    //if (Expression.getIdentityMatrixCoefficient(y) !== null) {
    //  if (x instanceof ExpressionMatrix) {
    //    return transformDivision(x, Expression.getIdentityMatrixCoefficient(y));
    //  }
    //  return Expression.makeIdentityMatrixWithCoefficient(transformDivision(x, Expression.getIdentityMatrixCoefficient(y)));
    //}

    if (x instanceof ExpressionMatrix && y instanceof ExpressionMatrix) {
      return new ExpressionMatrix(x.matrix.multiply(y.matrix.inverse()));
    }
    if (x instanceof ExpressionMatrix) {
      return new ExpressionMatrix(x.matrix.scale(y.inverse()));
    }
    if (y instanceof ExpressionMatrix) {
      return new ExpressionMatrix(y.matrix.inverse().scale(x));
    }

    if (y.equals(Integer.ZERO)) {
      //TODO: fix?
      throw new ArithmeticException("division by zero");
    }
    if (x.equals(Integer.ZERO)) {
      return Integer.ZERO;
    }
    if (y.equals(Integer.ONE)) {
      return x;
    }
    if (x instanceof Division) {
      return transformDivision(x.a, x.b.multiply(y));
    }
    if (y instanceof Division) {
      return transformDivision(x.multiply(y.b), y.a);
    }

    // for performance only
    if (x instanceof Integer && y instanceof Integer) {
      var gBigInteger = bigIntegerGCD(x.bigInteger, y.bigInteger);
      if (y.bigInteger.compareTo(BigInteger.ZERO) < 0) {
        gBigInteger = gBigInteger.negate();
      }
      x = new Integer(x.bigInteger.divide(gBigInteger));
      y = new Integer(y.bigInteger.divide(gBigInteger));
      return y.bigInteger.compareTo(BigInteger.ONE) === 0 ? x : new Division(x, y);
    }

    if (!checkMultivariatePolynomial(x, 0)) {
      throw new Error();
    }
    if (!checkMultivariatePolynomial(y, 0)) {
      throw new Error();
    }

    //!!! new (21.12.2013)
    if (allowConjugate) { //TODO: remove hack!
      var e = getConjugate(content(y, null));
      if (e !== null) {
        return transformDivision(transformMultiplication(x, e), transformMultiplication(y, e));
      }
    }

    var v = getVariable(x);//???
    //TODO: move?

    // gcd
    var g = gcd(x, y, v);

    if (!g.equals(Integer.ONE)) {
      if (v === null || g instanceof Integer) {
        //???
        x = divideByInteger(x, g);
        y = divideByInteger(y, g);
        return transformDivision(x, y, false);
      }
      var x2 = divideAndRemainder(x, g, v)[0];
      var y2 = divideAndRemainder(y, g, v)[0];
      return transformDivision(x2, y2, false);
    }
    
    //var lc = getConstant(getLeadingCoefficient(y, v));
    var lc = getConstant(getLeadingCoefficient(y, getVariable(y)));
    if (lc.bigInteger.compareTo(BigInteger.ZERO) < 0) {
      return transformDivision(x.negate(), y.negate(), false);
    }
    return new Division(x, y);
  };

  function Expression() {
    
  }

  Expression.callbacks = {
    rank: null,
    determinant: null
  };
  Expression.Event = function (type, data) {
    this.type = type;
    this.data = data;
  };

  var checkExpression = function (x) {
    if (!(x instanceof Expression)) {
      throw new TypeError();
    }
  };

  Expression.prototype = {
    negate: function () {
      var a = this;
      checkExpression(a);
      return transformMultiplication(Integer.MINUS_ONE, a);
    },
    add: function (b) {
      var a = this;
      checkExpression(a);
      checkExpression(b);
      return transformAddition(a, b);
    },
    subtract: function (b) {
      var a = this;
      checkExpression(a);
      checkExpression(b);
      //TODO: new operation - Subtraction !!!
      return transformAddition(a, b.negate());
    },
    divide: function (b) {
      var a = this;
      checkExpression(a);
      checkExpression(b);
      return transformDivision(a, b);
    },
    multiply: function (b) {
      var a = this;
      checkExpression(a);
      checkExpression(b);
      return transformMultiplication(a, b);
    },
    pow: function (b) {
      var a = this;
      checkExpression(a);
      checkExpression(b);
      return transformExponentiation(a, b);
    },
    
    compareTo: function (b) {
      throw new Error();
    },
    //compareTo: function (b) {
    //  return this instanceof Integer && b instanceof Integer ? this.bigInteger.compareTo(b.bigInteger) : 1;//TODO: fix!
    //},
    getDenominator: function () {
      //TODO: FIX!!!!
      return this instanceof Division ? this.b : Integer.ONE;
    },
    getNumerator: function () {
      //TODO: FIX!!!!
      return this instanceof Division ? this.a : this;
    },
    inverse: function () {
      return transformDivision(Integer.ONE, this);
    }
  };

  // TODO: fix or remove ?
  Expression.prototype.gcd = function (x) {
    return gcd(this, x, getVariable(this));
  };

//TODO: merge with Fraction.js ?!?
var precedence = {
  binary: {
    ".^": 5,
    "^": 5,
    "*": 3,
    "/": 3,
    "+": 2,
    "-": 2
  },
  unary: {
    "-": 5//HACK
  }
};

  function Symbol(symbol) {
    Expression.call(this);
    this.symbol = String(symbol);
  }

  Symbol.prototype = stdObjectCreate(Expression.prototype);

  Symbol.prototype.toString = function () {
    return this.symbol;
  };

  function Integer(bigInteger) {
    Expression.call(this);
    this.bigInteger = bigInteger;
  }

  Integer.prototype = stdObjectCreate(Expression.prototype);

  Integer.prototype.toString = function () {
    return this.bigInteger.toString();
  };

  function ExpressionMatrix(matrix) {
    Expression.call(this);
    this.matrix = matrix;
  }

  ExpressionMatrix.prototype = stdObjectCreate(Expression.prototype);

  ExpressionMatrix.prototype.toString = function () {
    return this.matrix.toString();
  };

  //?
  /*
  ExpressionMatrix.prototype.equals = function (b) {
    var a = this;
    if (!(b instanceof ExpressionMatrix)) {
      return false;
    }
    var am = a.matrix;
    var bm = b.matrix;
    if (am.rows() !== bm.rows() || am.cols() !== bm.cols()) {
      return false;
    }
    var i = -1;
    while (++i < am.rows()) {
      var j = -1;
      while (++j < bm.rows()) {
        if (am.e(i, j) !== bm.e(i, j)) {
          return false;
        }
      }
    }
    return true;
  };
  */
  //?

  function BinaryOperation(a, b) {
    Expression.call(this);
    this.a = a;
    this.b = b;
  }

  BinaryOperation.prototype = stdObjectCreate(Expression.prototype);

  BinaryOperation.prototype.isNegation = function () {
    return (this instanceof Multiplication && this.a instanceof Integer && this.a.equals(Integer.MINUS_ONE));
  };

  BinaryOperation.prototype.toString = function () {
    var a = this.a;
    var b = this.b;
    var isSubtraction = false;
    // TODO: check
    /*
    if (Expression.simplification && this instanceof Expression.Addition && Expression.isNegative(a)) {
      var tmp = b;
      b = a;
      a = tmp;
    }*/

    if (Expression.simplification && this instanceof Expression.Addition && Expression.isNegative(b)) {
      isSubtraction = true;
      b = b.negate();//?
    }
    var fa = getPrecedence(a) < getPrecedence(this);
    var fb = getPrecedence(b) <= getPrecedence(this) + (Expression.isRightToLeftAssociative(this) ? 1 : 0);
    var s = isSubtraction ? "-" : getS(this);
    //TODO: fix spaces (matrix parsing)
    if (this.isNegation()) {
      // assert(fa === false);
      return "-" + (fb ? "(" : "") + String(b) + (fb ? ")" : "");
    }
    return (fa ? "(" : "") + String(a) + (fa ? ")" : "") + s + (fb ? "(" : "") + String(b) + (fb ? ")" : "");
  };

  function Exponentiation(a, b) {
    BinaryOperation.call(this, a, b);
  }

  Exponentiation.prototype = stdObjectCreate(BinaryOperation.prototype);

  function Multiplication(a, b) {
    BinaryOperation.call(this, a, b);
  }

  Multiplication.prototype = stdObjectCreate(BinaryOperation.prototype);

  function Addition(a, b) {
    BinaryOperation.call(this, a, b);
  }

  Addition.prototype = stdObjectCreate(BinaryOperation.prototype);

  function Division(a, b) {
    BinaryOperation.call(this, a, b);
  }

  Division.prototype = stdObjectCreate(BinaryOperation.prototype);

  // TODO: move
  Expression.prototype.equals = function (b) {
    throw new Error();//?
  };
  Integer.prototype.equals = function (b) {
    return b instanceof Integer && this.bigInteger.compareTo(b.bigInteger) === 0;
  };
  Symbol.prototype.equals = function (b) {
    return b instanceof Symbol && this.symbol === b.symbol;
  };
  //TODO: Matrix.prototype.equals
  BinaryOperation.prototype.equals = function (b) {
    return getS(this) === getS(b) && this.a.equals(b.a) && this.b.equals(b.b);
  };

  Expression.IdentityMatrix = new Symbol("I");

  var getS = function (x) {
    if (x instanceof Expression.ElementWisePower) {
      return ".^";
    }
    if (x instanceof Exponentiation) {
      return "^";
    }
    if (x instanceof Multiplication) {
      return "*";
    }
    if (x instanceof Addition) {
      return "+";
    }
    if (x instanceof Division) {
      return "/";
    }
  };

  var getPrecedence = function (x) {
    if (x instanceof BinaryOperation) {
      if (x.isNegation()) {
        return precedence.unary["-"];
      }
      return precedence.binary[getS(x)];
    }
    return 1000;
  };

  Integer.ZERO = new Integer(BigInteger.ZERO);
  Integer.ONE = new Integer(BigInteger.ONE);
  Integer.MINUS_ONE = new Integer(BigInteger.ONE.negate());

  Expression.precedence = precedence;

  Expression.Symbol = Symbol;
  Expression.Integer = Integer;
  Expression.Matrix = ExpressionMatrix;
  Expression.Exponentiation = Exponentiation;
  Expression.Division = Division;
  Expression.BinaryOperation = BinaryOperation;

  Expression.isNegative = function (x) {
    if (x instanceof Integer) {
      return x.bigInteger.compareTo(BigInteger.ZERO) < 0;
    }
    if (x instanceof Addition) {
      return Expression.isNegative(x.a) && Expression.isNegative(x.b);
    }
    // Division ?
    return (x instanceof Multiplication) && getConstant(x).bigInteger.compareTo(BigInteger.ZERO) < 0;
  };

  Expression.Function = function (name, a) {
    Expression.call(this);
    this.name = name;
    this.a = a;
  };
  Expression.Function.prototype = stdObjectCreate(Expression.prototype);
  Expression.Function.prototype.toString = function () {
  //?
    return this.name + "(" + String(this.a) + ")";
  };
  Expression.Function.prototype.equals = function (b) {
    return b instanceof Expression.Function && this.name === b.name && this.a.equals(b.a);
  };

  Expression.SquareRoot = function (a) {
    if (!(a instanceof Integer)) {
      throw new Error();//!!!
    }
    Expression.Function.call(this, "sqrt", a);
  };
  Expression.SquareRoot.prototype = stdObjectCreate(Expression.Function.prototype);
  Expression.SquareRoot.prototype.toString = function () {
  //?
    return String(this.a) + "^0.5";
  };
  Expression.transformSquareRoot = function (x) {
    if (!Expression.simplification) {
      return new Expression.SquareRoot(x);
    }
    //?
    if (x instanceof Division) {
      return transformDivision(Expression.transformSquareRoot(x.a), Expression.transformSquareRoot(x.b));
    }
    if (x instanceof Integer) {
      var n = x.bigInteger;
      if (n.compareTo(BigInteger.ZERO) < 0) {
        throw new UserError();
      }
      if (n.compareTo(BigInteger.ZERO) === 0) {
        return x;
      }
      var t = BigInteger.ONE.add(BigInteger.ONE);
      var y = BigInteger.ONE;
      while (t.multiply(t).compareTo(n) <= 0) {
        while (n.remainder(t.multiply(t)).compareTo(BigInteger.ZERO) === 0) {
          n = n.divide(t.multiply(t));
          y = y.multiply(t);
        }
        t = t.add(BigInteger.ONE);
      }
      if (n.compareTo(BigInteger.ONE) === 0) {
        return new Integer(y);
      }
      if (y.compareTo(BigInteger.ONE) === 0) {
        return new Expression.SquareRoot(new Integer(n));
      }
      return transformMultiplication(new Integer(y), new Expression.SquareRoot(new Integer(n)));
    }
    throw new UserError();
  };

  Expression.Rank = function (matrix) {
    Expression.Function.call(this, "rank", matrix);
  };
  Expression.Rank.prototype = stdObjectCreate(Expression.Function.prototype);
  Expression.transformRank = function (x) {
    if (!(x instanceof Expression.Matrix)) {
      throw new UserError();//?
    }
    if (!Expression.simplification) {
      return new Expression.Rank(x);
    }
    //!
    if (Expression.callbacks.rank !== null) {
      Expression.callbacks.rank(new Expression.Event("rank", x));
    }
    return new Integer(new BigInteger(String(x.matrix.rank())));
  };
  Expression.Determinant = function (matrix) {
    Expression.Function.call(this, "determinant", matrix);
  };
  Expression.Determinant.prototype = stdObjectCreate(Expression.Function.prototype);
  Expression.transformDeterminant = function (x) {
    if (!(x instanceof Expression.Matrix)) {
      throw new UserError();//?
    }
    if (!Expression.simplification) {
      return new Expression.Determinant(x);
    }
    //!
    if (Expression.callbacks.determinant !== null) {
      Expression.callbacks.determinant(new Expression.Event("determinant", x));
    }
    return x.matrix.determinant();
  };
  Expression.Transpose = function (matrix) {
    Expression.Function.call(this, "transpose", matrix);
  };
  Expression.Transpose.prototype = stdObjectCreate(Expression.Function.prototype);
  Expression.transformTranspose = function (x) {
    if (!(x instanceof Expression.Matrix)) {
      throw new UserError();//?
    }
    if (!Expression.simplification) {
      return new Expression.Transpose(x);
    }
    return new ExpressionMatrix(x.matrix.transpose());
  };
  /*
  Expression.Diagonalize = function (matrix) {
    Expression.Function.call(this, "diagonalize", matrix);
  };
  Expression.Diagonalize.prototype = stdObjectCreate(Expression.Function.prototype);
  Expression.transformDiagonalize = function (x) {
    if (!(x instanceof Expression.Matrix)) {
      throw new UserError();//?
    }
    if (!Expression.simplification) {
      return new Expression.Diagonalize(x);
    }
    //return ?
    return x;
  };*/

  Expression.ElementWisePower = function (a, b) {
    BinaryOperation.call(this, a, b);
  };
  Expression.ElementWisePower.prototype = stdObjectCreate(BinaryOperation.prototype);
  Expression.transformElementWisePower = function (x, e) {
    if (!(x instanceof Expression.Matrix)) {
      throw new UserError();//?
    }
    //?
    //if (!Expression.simplification) {
    //  return new Expression.ElementWisePower(x);
    //}
    return new ExpressionMatrix(x.matrix.map(function (element, i, j) {
      return element.pow(e);
    }));
  };

  Expression.getPrecedence = getPrecedence;
  Expression.isRightToLeftAssociative = function (x) {
    if (x instanceof BinaryOperation) {
      if (x.isNegation()) {
        return true;
      }
      return x instanceof Exponentiation;
    }
    return false;
  };
  Expression.getS = getS;

  Expression.simplification = true;

  //?
  Expression.everySimpleDivisor = function (e, callback) {
    if (e instanceof Expression.Matrix) {
      throw new Error();
    }
    e = e.getNumerator();//?
    var v = getVariable(e);
    if (v !== null) {
      var c = content(e, v);
      if (!c.equals(Integer.ONE) && !Expression.everySimpleDivisor(c, callback)) {
        return false;
      }
      //?

      e = pp(e, v);

      //?
      if (e.equals(v) || e.negate().equals(v)) {//???
        if (!callback(v)) {
          return false;
        }
        return true;
      }

      var coefficients = getCoefficients(e, v);
      var an = coefficients[coefficients.length - 1].coefficient;
      var a0 = coefficients[0].coefficient;

      var flag = Expression.everyDivisor(a0, function (p) {
        return Expression.everyDivisor(an, function (q) {
          // calcAt(p.divide(q), coefficients)
          var s = 2;
          var f = p.divide(q);
          while (--s >= 0) {
            if (s === 0) {
              f = f.negate();
            }

            //var x = v.subtract(f);
            var x = s === 0 ? v.multiply(q).subtract(p) : v.multiply(q).add(p);

            var z = divide2(e, x, v);
            while (z !== null) {
              e = z;
              if (!callback(x)) {
                return false;
              }
              z = divide2(e, x, v);//divideAndRemainder(e, x, v);
            }
            /*
            var z = divideAndRemainder(e, x, v);
            while (z[1].equals(Integer.ZERO)) {
              e = z[0];
              if (!callback(x)) {
                return false;
              }
              z = divideAndRemainder(e, x, v);
            }*/

          }
          return true;
        });
      });
      if (!flag) {
        return false;
      }
      if (!e.equals(Integer.MINUS_ONE)) {//?
        if (!e.equals(Integer.ONE)) {
          return callback(e);
        }
      }
    } else {
      if (e instanceof Symbol) {
        if (!callback(Integer.ONE)) {
          return false;
        }
        if (!callback(e)) {
          return false;
        }
      } else if (e instanceof Integer) {
        var n = e.bigInteger;
        if (n.compareTo(BigInteger.ZERO) < 0) {
          n = n.negate();
        }
        var d = BigInteger.ONE.add(BigInteger.ONE);
        while (n.compareTo(BigInteger.ONE) > 0) {
          while (n.remainder(d).compareTo(BigInteger.ZERO) === 0) {
            n = n.divide(d);
            if (!callback(new Integer(d))) {
              return false;
            }
          }
          d = d.add(BigInteger.ONE);
          if (d.multiply(d).compareTo(n) > 0) {
            d = n;
          }
        }
      } else {
        throw new Error();//?
      }
    }
    return true;
  };

  Expression.everyDivisor = function (e, callback) {
    var divisors = [];
    if (!callback(Integer.ONE)) {
      return false;
    }
    return Expression.everySimpleDivisor(e, function (d) {
      var i = -1;
      var l = divisors.length;
      var n = Math.pow(2, l);
      while (++i < n) {
        var z = d;
        var j = -1;
        var x = i;
        while (++j < l) {
          var half = Math.floor(x / 2);
          if (half * 2 !== x) {
            z = z.multiply(divisors[j]);
          }
          x = half;
        }
        if (!callback(z)) {
          return false;
        }
      }
      divisors.push(d);
      return true;
    });
  };

  Expression.getDivisors = function (e) {
    var divisors = [];
    Expression.everyDivisor(e, function (d) {
      divisors.push(d);
      return true;
    });
    return divisors;
  };

  Expression.Multiplication = Multiplication;
  Expression.Addition = Addition;

  Expression.pow = pow;
  global.Expression = Expression;

}(this));

/*jslint plusplus: true, vars: true, indent: 2 */
/*global BigInteger, Expression */

(function (global) {
  "use strict";

  function SimpleMap() {
    this.data = {};
    this.array = [];
  }

  SimpleMap.prototype = {
    get: function (key) {
      return this.data[key];
    },
    set: function (key, value) {
      if (this.data[key] === undefined) {
        this.array.push(key);
      }
      this.data[key] = value;
    },
    forEach: function (callback) {
      var array = this.array;
      var data = this.data;
      var i = -1;
      while (++i < array.length) {
        var key = array[i];
        callback(data[key], key, this);
      }
    }
  };

  global.SimpleMap = SimpleMap;
  if (typeof global.Map === "function" && typeof global.Map.prototype.forEach === "function") {
    global.SimpleMap = global.Map;
  }

}(this));

(function (exports) {
  "use strict";

  function UserError(message, input) {
    this.message = String(message || "");
    this.input = input || null;
  }

  var stdObjectCreate = function (proto) {
    var F = function () {
    };
    F.prototype = proto;
    return new F();
  };
  UserError.prototype = stdObjectCreate(Error.prototype);

  var RPN = null;

  var ZERO = BigInteger.ZERO;
  var ONE = BigInteger.ONE;
  var MINUS_ONE = ONE.negate();
  var TEN = new BigInteger("10");
  var FIVE = new BigInteger("5");

  // http://en.wikipedia.org/wiki/Operators_in_C_and_C%2B%2B#Operator_precedence

  var Operator = function (name, arity, rightToLeftAssociative, precedence, i) {
    this.name = name;
    this.arity = arity;
    this.rightToLeftAssociative = rightToLeftAssociative;
    this.precedence = precedence;
    this.i = i;
  };

  var MULTIPLICATION = new Operator("*", 2, false, 3, function (a, b) {
    return a.multiply(b);
  });
  var operations = [
    new Operator("+", 2, false, 2, function (a, b) {
      return a.add(b);
    }),
    new Operator("-", 2, false, 2, function (a, b) {
      return a.subtract(b);
    }),
    MULTIPLICATION,
    new Operator("index.html", 2, false, 3, function (a, b) {
      return a.divide(b);
    }),
    //new Operator("%", 2, false, 3, function (a, b) {
    //  return a.remainder(b);
    //}),
    new Operator("+", 1, true, 5, function (e) {
      return e;
    }),
    new Operator("-", 1, true, 5, function (e) {
      return e.negate();
    }),
    new Operator("^", 2, true, 5, function (a, b) {
      return a.pow(b);
    }),
    new Operator(".^", 2, true, 5, function (a, b) {
      return Expression.transformElementWisePower(a, b);
    }),//?
    new Operator("(", 0, false, 0, function () {
      throw new Error();
    }),
    new Operator(")", 0, false, 1, function () {
      throw new Error();
    }),
    new Operator("\u221a", 1, false, 5, function (a) {
      return Expression.transformSquareRoot(a);
    }),
    new Operator("sqrt", 1, false, 5, function (a) {
      return Expression.transformSquareRoot(a);
    }),
    new Operator("rank", 1, false, 5, function (a) {
      return Expression.transformRank(a);
    }),
    //new Operator("trace", 1, false, 5, function (a) {
    //  return Expression.transformTrace(a);
    //}),
    new Operator("determinant", 1, false, 5, function (a) {
      return Expression.transformDeterminant(a);
    }),
    new Operator("transpose", 1, false, 5, function (a) {
      return Expression.transformTranspose(a);
    }),
    new Operator("^T", 1, false, 5, function (a) {
      return Expression.transformTranspose(a);
    })
    //new Operator("row reduce", 1, false, 5, function (a) {
    //  return Expression.transformRowReduce(a);
    //}),
    //new Operator("diagonalize", 1, false, 5, function (a) {
    //  return Expression.transformDiagonalize(a);
    //}),
  ];

  var operationSearchCache = new SimpleMap();
  var addOperationToSearchCache = function (operator) {
    var c = operator.name.charCodeAt(0);
    if (operationSearchCache.get(c) === undefined) {
      operationSearchCache.set(c, []);
    }
    operationSearchCache.get(c).push(operator);
  };

  var i = -1;
  while (++i < operations.length) {
    addOperationToSearchCache(operations[i]);
  }

  //TODO: remove
  Expression.createInteger = function (x) {
    return RPN.elementFactory !== null ? RPN.elementFactory(x, BigInteger.ONE) : new Expression.Integer(x);
  };
  Expression.createMatrix = function (x) {
    if (RPN.elementFactory !== null) {
      throw new UserError();
    }
    return new Expression.Matrix(x);
  };
  Expression.createSymbol = function (x) {
    if (RPN.elementFactory !== null) {
      throw new UserError();
    }
    return new Expression.Symbol(x);
  };

  function Input(s) {
    this.data = s.replace(/^\s+$/, "");
    this.trimLeft();
  }

  Input.prototype = {
    trimLeft: function () {
      this.data = this.data.replace(/^\s+/, "");
    },
    parseCharacter: function (characterCode) {
      var c = this.data.charCodeAt(0);
      if (c !== characterCode) {
        throw new UserError();
      }
      this.data = this.data.slice(1);
      this.trimLeft();
    },
    getFirst: function () {
      return this.data.charCodeAt(0);
    },
    skip: function (n) {
      //TODO: remove "slice"
      this.data = this.data.slice(n);
    },
    isEmpty: function () {
      return this.data.length === 0;
    },
    startsWith: function (s) {
      return this.data.lastIndexOf(s, 0) === 0;
    },
    match: function (regularExpression) {
      return this.data.match(regularExpression);
    },
    //?
    getData: function () {
      return this.data;
    }
  };
  
  var MATRIX_OPENING_BRACKET = "{".charCodeAt(0);
  var MATRIX_CLOSING_BRACKET = "}".charCodeAt(0);

  var parseMatrix = function (q, context) {
    var DELIMITER = ",".charCodeAt(0);//?
    //var openingBracket = q.getFirst();
    //var closingBracket = openingBracket === "{".charCodeAt(0) ? "}".charCodeAt(0) : null;
    var openingBracket = MATRIX_OPENING_BRACKET;
    var closingBracket = MATRIX_CLOSING_BRACKET;

    q.parseCharacter(openingBracket);
    var rows = [];
    var firstRow = true;
    while (firstRow || q.getFirst() === DELIMITER) {
      if (firstRow) {
        firstRow = false;
      } else {
        q.skip(1);
        q.trimLeft();
      }
      q.parseCharacter(openingBracket);
      var row = [];
      var firstCell = true;
      while (firstCell || q.getFirst() === DELIMITER) {
        if (firstCell) {
          firstCell = false;
        } else {
          q.skip(1);
          q.trimLeft();
        }
        var e = parseExpression(q, context, true);
        q.trimLeft();
        row.push(e);
      }
      q.parseCharacter(closingBracket);
      rows.push(row);
    }
    q.parseCharacter(closingBracket);
    return new Matrix(rows);
  };

  var addOperation = function (op, tmp, rpn) {
    if (op.name !== "(" && op.name !== ")") {
      while (tmp.length > 0 && tmp[tmp.length - 1].precedence > op.precedence + (op.rightToLeftAssociative ? 0 : -1)) {
        rpn.push({
          operand: false,
          value: tmp.pop()
        });
      }
    }
    if (op.name === ")") {
      while (tmp.length > 0 && tmp[tmp.length - 1].name !== "(") {
        rpn.push({
          operand: false,
          value: tmp.pop()
        });
      }
      if (tmp.length === 0) {
        // TODO: fix error messages
        // missing the brace ?
        throw new UserError("RPN error 0");//, input ?
      }
      tmp.pop();
    } else {
      tmp.push(op);
    }
  };

  var addInvisibleMultiplication = function (wasOperation, tmp, rpn) {
    if (!wasOperation) {
      addOperation(MULTIPLICATION, tmp, rpn);
    }
  };

  var symbols = /^[a-zA-Z\u0430-\u044F\u0410-\u042F\u03b1-\u03c9]/g;

  var parseExpression = function (q, context, isMatrixElement) {

    //!HACK:
    var decimalFractionRegExp = /^(\d*)(?:[\.,](\d*)?(?:\((\d*)\))?)?(?:(?:e|E)(\+|-)?(\d+))?/;
    if (isMatrixElement) {
      // without comma !?
      decimalFractionRegExp = /^(\d*)(?:[\.](\d*)?(?:\((\d*)\))?)?(?:(?:e|E)(\+|-)?(\d+))?/;
    }

    var input = q.getData();
    //context = context || null;
    if (input === "0" && RPN.ZERO !== null) {
      q.skip(1);//?
      return RPN.ZERO;
    }
    if (input === "1" && RPN.ONE !== null) {
      q.skip(1);//?
      return RPN.ONE;
    }

    var rpn = [];
    var tmp = [];
    var match = null;
    var wasOperation = true;
    var ok = true;
    //!

    while (!q.isEmpty() && ok) {
      q.trimLeft();
      var op = null;

      var operationsArray = operationSearchCache.get(q.getFirst());
      var opl = operationsArray !== undefined ? operationsArray.length : 0;
      var bestMatchLength = 0;//? "^T" and "^"
      var j = -1;
      while (++j < opl) {
        var candidate = operationsArray[j];
        if ((candidate.arity < 2 || !wasOperation) && q.startsWith(candidate.name) && bestMatchLength < candidate.name.length) {
          op = candidate;
          bestMatchLength = op.name.length;
        }
      }

      if (op !== null) {
        if (op.name === "(") {
          addInvisibleMultiplication(wasOperation, tmp, rpn);
        }
        addOperation(op, tmp, rpn);
        q.skip(op.name.length);
      //! new
      } else if (context !== null && (match = q.match(/^[abk]/i)) !== null && context.get(match[0].toUpperCase()) !== undefined) {
        var z = context.get(match[0].toUpperCase());
        addInvisibleMultiplication(wasOperation, tmp, rpn);
        rpn.push({
          operand: true,
          value: z
        });
        q.skip(match.length);
      } else if ((match = q.match(symbols)) !== null) {
        addInvisibleMultiplication(wasOperation, tmp, rpn);
        rpn.push({
          operand: true,
          value: Expression.createSymbol(match[0])
        });
        q.skip(match.length);
      } else if ((match = q.match(decimalFractionRegExp)) !== null && match[0].replace(/^\s+|\s+$/g, "").length !== 0) { // $ ?for RPN

        //var exp = (new BigInteger(match[4] || "0")).multiply(match[4] === "-" ? MINUS_ONE : ONE);
        var exp = Number(match[5] || "0") * (match[4] === "-" ? -1 : +1);
        var intpart = match[1] !== undefined ? new BigInteger(match[1]) : BigInteger.ZERO;
        var nrfrac = match[2] !== undefined ? new BigInteger(match[2]) : BigInteger.ZERO;
        var rfrac = match[3] !== undefined ? new BigInteger(match[3]) : BigInteger.ZERO;

        var fl2 = Expression.pow(TEN, (match[2] || "").length, ONE);
        var fl3 = Expression.pow(TEN, (match[3] || "").length, ONE).subtract((match[3] || "").length ? ONE : ZERO);
        var e = Expression.pow(TEN, exp < 0 ? -exp : exp, ONE);

        var num = intpart.multiply(fl2).add(nrfrac).multiply(fl3).add(rfrac);
        var denom = fl2.multiply(fl3);

        if (exp < 0) {
          denom = denom.multiply(e);
        } else {
          num = num.multiply(e);
        }

        addInvisibleMultiplication(wasOperation, tmp, rpn);
        rpn.push({
          operand: true,
          value: denom.compareTo(ONE) === 0 ? Expression.createInteger(num) : Expression.createInteger(num).divide(Expression.createInteger(denom))
        });
        q.skip(match[0].length);
      //!!!
      } else if (q.getFirst() === MATRIX_OPENING_BRACKET) {
        addInvisibleMultiplication(wasOperation, tmp, rpn);
        rpn.push({
          operand: true,
          value: Expression.createMatrix(parseMatrix(q, context))
        });
      } else {
        ok = false;
      }
      wasOperation = op !== null && op.name !== ")";
    }

    //TODO:
    // duplicate code - see if (op.name === ")") {
    while (tmp.length > 0) {
      rpn.push({
        operand: false,
        value: tmp.pop()
      });
    }

    //if (tmp.length > 0) {
    //  throw new UserError("RPN error -1", input);
    //}

    return calculate(input, rpn);
  };

  RPN = function (st, context) {
    context = context === undefined ? null : context;

    // TODO: remove
    if (typeof st !== "string") {
      throw new TypeError();
    }

    if (RPN.currentInput !== null) {
      RPN.currentInput.push({
        input: st
      });
    }

    //TODO: fix ???
    // u2212 - &minus;
    st = st.replace(/\u0410/gi, "A")
           .replace(/\u0412/gi, "B")
           .replace(/\u0421/gi, "C")
           .replace(/[\u00D7\u2022\u22C5]/g, "*")
           .replace(/[\u2010\u2011\u2012\u2013\u2014\u2015\u2212]/g, "-")
           .replace(/\u00F7/g, "index.html");
    //???

    var q = new Input(st);

    var result = parseExpression(q, context, false);
    if (!q.isEmpty()) {
      throw new UserError(" " + q.getData());// TODO: fix
    }

    if (context !== null) {//TODO -> is string required
      Expression.simplification = false;
      context.callback(parseExpression(new Input(st), context, false));
      Expression.simplification = true;
    }

    if (RPN.currentInput !== null) {
      RPN.currentInput.pop(); //!
    }
    return result;
  };

  var calculate = function (input, rpn) {
    var tmp = [];
    var i = -1;
    var rpnl = rpn.length;
    var a = null;
    var b = null;
    while (++i < rpnl) {
      var x = rpn[i];
      if (x.operand) {
        tmp.push(x.value);
      } else {
        //if (tmp.length - x.value.arity + 1 < 0) {
        var arity = x.value.arity;
        if (tmp.length < arity) {
          throw new UserError("RPN error 1", input);
        }
        var implementation = x.value.i;
        var x1 = null;
        if (arity === 0) {
          // "(<wrong>-5)"
          throw new UserError();
        } else if (arity === 1) {
          a = tmp.pop();
          x1 = implementation(a);
        } else if (arity === 2) {
          b = tmp.pop();
          a = tmp.pop();
          x1 = implementation(a, b);
        } else {
          throw new Error("not implemented!");
        }
        tmp.push(x1);
      }
    }
    if (tmp.length !== 1) {
      throw new UserError("RPN error 2", input);
    }
    return tmp[0];
  };

  RPN.currentInput = null;
  RPN.elementFactory = null;
  RPN.ZERO = null;
  RPN.ONE = null;
  RPN.ZERO = RPN("0");
  RPN.ONE = RPN("1");

  // Polynom(a0, a1, a2, ...., an);
  // an*x^n+ an-1 x ^n-1 +... + a0

  var ELEMENT_ZERO = RPN("0");

  var check = function (x) {
    if (!(x instanceof Polynom)) {
      throw new TypeError();
    }
  };

  function Polynom(n) {
    if (n instanceof Polynom) {
      this.a = n.a;
    } else {
      this.a = [];
      var i = -1;
      while (++i < arguments.length) {
        //this.a[i] = RPN(String(arguments[i]));
        var z = arguments[i];
        this.a[i] = z;
      }
      while (this.a.length && this.a[this.a.length - 1].equals(ELEMENT_ZERO)) {
        this.a.length = this.a.length - 1;
      }
    }
  }

  Polynom.prototype = {

    /*
    compareTo: function (p) {
      check(this);
      check(p);
      var ii = 0;
      var i = Math.max(this.a.length, p.a.length);
      while (--i >= 0 && ii === 0) {
        ii = (i < this.a.length ? this.a[i] : ELEMENT_ZERO).compareTo(i < p.a.length ? p.a[i] : ELEMENT_ZERO);
      }
      return ii;
    },
    */

    equals: function (p) {
      check(this);
      check(p);
      var i = this.a.length;
      if (i !== p.a.length) {
        return false;
      }
      while (--i >= 0) {
        if (!this.a[i].equals(p.a[i])) {
          return false;
        }
      }
      return true;
    },

    add: function (p) {
      check(p);
      var i, z, result = new Polynom(RPN("0")), msd = true;
      for (i = Math.max(this.a.length, p.a.length) - 1; i >= 0; i--) {
        z = (i < this.a.length ? this.a[i] : ELEMENT_ZERO).add(i < p.a.length ? p.a[i] : ELEMENT_ZERO);
        if (!msd || !z.equals(ELEMENT_ZERO)) {
          result.a[i] = z;
          msd = false;
        }
      }
      return result;
    },

    shift: function (n) { // <<<= x^n, n>=0
      check(this);
      var result = new Polynom(this), j, na;
      if (result.a.length && n) {
        na = [];
        for (j = result.a.length - 1 + n; j >= 0; j--) {
          na[j] = (j >= n ? result.a[j - n] : ELEMENT_ZERO);
        }
        result.a = na;
      }
      return result;
    },

    multiply: function (p) {
      check(this);
      check(p);
      var np = new Polynom(RPN("0")), t;
      var i = p.a.length;
      while (--i >= 0) {
        t = new Polynom(RPN("0"));
        var j = this.a.length;
        while (--j >= 0) {
          t.a[j] = this.a[j].multiply(p.a[i]);
        }
        if (np.a.length) {
          np.a.unshift(ELEMENT_ZERO);
        }
        np = np.add(t);
      }
      return np;
    },

    divideAndRemainder: function (p) {
      check(this);
      check(p);
      if (p.equals(new Polynom(RPN("0")))) {
        throw new ArithmeticException("Division by zero in function divideAndRemainder");//!
      }
      var div = new Polynom(RPN("0"));
      var rem = new Polynom(this);
      while (rem.a.length >= p.a.length) {
        var q = rem.a[rem.a.length - 1].divide(p.a[p.a.length - 1]);
        var pq = new Polynom(q);
        div = div.add(pq.shift(rem.a.length - p.a.length));
        rem = rem.subtract(p.multiply(pq).shift(rem.a.length - p.a.length));
      }
      return [div, rem];
    },


    calcAt: function (point) {//!!!
      check(this);
      point = RPN(String(point));
      var n = ELEMENT_ZERO, i;
      for (i = this.a.length - 1; i >= 0; i--) {
        n = n.multiply(point).add(this.a[i]);
      }
      return n;
    },

    getcoef: function () {
      check(this);
      if (this.a.length === 0) {
        throw new Error("error in function getcoef");
      }
      var cf = this.a[this.a.length - 1];
      var i = this.a.length - 1;
      while (--i >= 0) {
        if (!this.a[i].equals(ELEMENT_ZERO)) {
          //cf = cf.commonFraction(this.a[i]);
          var y = this.a[i];
          var lcm = cf.getDenominator().divide(cf.getDenominator().gcd(y.getDenominator())).multiply(y.getDenominator());
          cf = cf.getNumerator().gcd(y.getNumerator()).divide(lcm);
        }
      }
      return cf;
    },

    // add, multiply, divideAndRemainder

    negate: function () {
      check(this);
      //TODO: fix
      return this.multiply(new Polynom(RPN("-1")));
    },

    subtract: function (l) {
      check(this);
      return this.negate().add(l).negate();
    },

    divide: function (l) {
      check(this);
      return this.divideAndRemainder(l)[0];
    },

    remainder: function (l) {
      check(this);
      return this.divideAndRemainder(l)[1];
    }

  };

  Polynom.prototype.getroots = function () {
    check(this);
    var roots = [];
    var np = this.divide(new Polynom(this.getcoef()));
    
    var specialCases = [{ // x = 0, x = 1, x = -1
      x: new Polynom(RPN("0"), RPN("1")),
      f: Expression.createInteger(BigInteger.ZERO)
    },
      {
        x: new Polynom(RPN("-1"), RPN("1")),
        f: Expression.createInteger(BigInteger.ONE)
      },
      {
        x: new Polynom(RPN("1"), RPN("1")),
        f: Expression.createInteger(BigInteger.ONE.negate())
      }];
    var i = 0;
    var zz = null;
    var pZERO = new Polynom(RPN("0"));//TODO: fix

    for (i = 0; i < specialCases.length; i++) {
      zz = np.divideAndRemainder(specialCases[i].x);
      while (zz[1].equals(pZERO)) {
        np = zz[0];
        roots.push(specialCases[i].f.add(ELEMENT_ZERO));
        zz = np.divideAndRemainder(specialCases[i].x);
      }
    }

    if (np.a.length === 2) {
      roots.push(np.a[0].negate().divide(np.a[1]));
    }

    if (np.a.length <= 2) {
      return roots;
    }

    var an = np.a[np.a.length - 1];
    var a0 = np.a[0];

    //TODO: http://en.wikipedia.org/wiki/Polynomial_remainder_theorem
    //var fp1 = getBigInteger(np.calcAt(1));
    //var fm1 = getBigInteger(np.calcAt(-1));

    var p, q, sp, f, x, z;

    /*
    function nextDivisor(big, d) { // big>=0,?  d>=0
      big = big.compareTo(BigInteger.ZERO) < 0 ? big.negate() : big;

      d = d.add(ONE);
      while (d.multiply(d).compareTo(big) <= 0 && big.remainder(d).compareTo(ZERO) !== 0) {
        d = d.add(ONE);
      }
      return (big.remainder(d).compareTo(ZERO) !== 0 ? (d.compareTo(big) < 0 ? big : null) : d);
    }*/

    // p/q
    //TODO: forEach -> some ?
    Expression.everyDivisor(a0, function (p) {
      return Expression.everyDivisor(an, function (q) {
        var sign = -3;
        while ((sign += 2) < 3) {
          sp = p.multiply(Expression.createInteger(sign === -1 ? MINUS_ONE : ONE));
          var f = sp.divide(q);

          if (// !fp1.remainder(sp.subtract(q)).equals(ZERO) ||
              // !fm1.remainder(sp.add(q)).equals(ZERO) ||
              // !sp.gcd(q).equals(ONE) || //?
              !np.calcAt(f).equals(ELEMENT_ZERO)) {//?
            continue;
          }

          x = new Polynom(sp.negate(), q);
          z = np.divideAndRemainder(x);
          while (z[1].equals(pZERO)) {
            roots.push(f);
            np = z[0];
            if (np.a.length === 2) {
              roots.push(np.a[0].negate().divide(np.a[1]));
              return false;// or divide
            }
            if (np.a.length <= 2) {
              return false;
            }
            //TODO: !!!
            //an = np.a[np.a.length - 1];//!
            //a0 = np.a[0];//!

            // fp1 = fp1.divide(q.subtract(sp));
            // fm1 = fm1.divide(q.negate().subtract(sp));
            z = np.divideAndRemainder(x);
          }
        }
        return true;
      });
    });

    return roots;
  };

  exports.UserError = UserError;
  exports.Polynom = Polynom;
  exports.RPN = RPN;

}(this));

/*jslint plusplus: true, vars: true, indent: 2 */
/*global RPN */

(function (exports) {
  "use strict";

  var stdObjectCreate = function (proto) {
    var F = function () {
    };
    F.prototype = proto;
    return new F();
  };

  function SingularMatrixException() {
    Function.prototype.apply.call(RangeError, this);
  }
  SingularMatrixException.prototype = stdObjectCreate(RangeError.prototype);

  function DimensionMismatchException(code) {
    Function.prototype.apply.call(RangeError, this);
    this.code = code;
  }
  DimensionMismatchException.prototype = stdObjectCreate(RangeError.prototype);

  /**
      API same as http://sylvester.jcoglan.com/api/matrix

      new Matrix([
          [1, 2, 3],
          [5, 6, 7],
          [7, 8,-1]
      ]);
  **/

  function Matrix(m) {
    if (!(m instanceof Array)) {
      throw new TypeError();
    }
    // number of columns = max length of row
    var cols = 0;
    var j = m.length;
    var s = null;
    while (--j >= 0) {
      s = m[j];
      if (!(s instanceof Array)) {
        throw new TypeError("!instanceof Array");
      }
      if (s.length > cols) {
        cols = s.length;
      }
    }
    j = -1;
    var data = [];
    while (++j < m.length) {
      s = m[j];
      var k = -1;
      var x = [];
      while (++k < cols) {
        //x[k] = k < s.length ? RPN(s[k]) : RPN.ZERO;
        if (k < s.length) {
          if (typeof s[k] === "string") {
            //throw new TypeError();//?
            x[k] = RPN(s[k]);//!
          } else {
            x[k] = s[k];
          }
        } else {
          x[k] = RPN.ZERO;
        }
      }
      data[j] = x;
    }
    this.a = data;
  }

  Matrix.Zero = function (rows, cols) {
    //if (!Number.isInteger(rows) || !Number.isInteger(cols)) {
    //  throw new TypeError();
    //}
    var a = [];
    var i = -1;
    while (++i < rows) {
      var j = -1;
      var x = [];
      while (++j < cols) {
        x[j] = RPN.ZERO;
      }
      a[i] = x;
    }
    return new Matrix(a);
  };

  Matrix.Random = function (rows, cols) {
    return Matrix.Zero(rows, cols).map(function () {
      return RPN((Math.random() * 10).toFixed(1));
    });
  };

  // identity n x n;
  Matrix.I = function (n) {
    return Matrix.Zero(n, n).map(function (element, i, j) {
      return (i === j ? RPN.ONE : RPN.ZERO);
    });
  };

  Matrix.Diagonal = function (elements) {
    return Matrix.Zero(elements.length, elements.length).map(function (element, i, j) {
      return (i === j ? elements[i] : RPN.ZERO);
    });
  };

  //var check = function (x) {
  //  if (!(x instanceof Matrix)) {
  //    throw new TypeError();
  //  }
  //};

  Matrix.prototype = {

    rows: function () {
      //check(this);
      return this.a.length;
    },

    cols: function () {
      //check(this);
      var a = this.a;
      return a.length > 0 ? a[0].length : 0;
    },

    e: function (i, j) {
      //check(this)
      return this.a[i][j];
    },

    isSquare: function() {
      //check(this);
      return this.rows() > 0 && this.rows() === this.cols();//?
    },

    isSameSizeAs: function (b) {
      //check(this);
      //check(b);
      return this.rows() === b.rows() && this.cols() === b.cols();
    },

    canMultiplyFromLeft: function (b) {
      //check(this);
      //check(b);
      return this.cols() === b.rows();
    },

    map: function (callback, thisArg) {
      //check(this);
      var rows = this.rows();
      var cols = this.cols();
      var c = [];
      var i = -1;
      while (++i < rows) {
        var x = [];
        var j = -1;
        while (++j < cols) {
          x[j] = callback.call(thisArg, this.e(i, j), i, j, this);
        }
        c[i] = x;
      }
      return (new Matrix(c));
    },

    transpose: function() {
      //check(this);
      var a = this;
      return Matrix.Zero(a.cols(), a.rows()).map(function (element, i, j) {
        return a.e(j, i);
      });
    },

    scale: function (k) {
      //check(this);
      return this.map(function (element, i, j) {
        return element.multiply(k);
      });
    },

    multiply: function (b) {
      //check(this);
      //check(b);
      var a = this;
      if (!a.canMultiplyFromLeft(b)) {
        throw new DimensionMismatchException("multiply");
      }
      return Matrix.Zero(a.rows(), b.cols()).map(function (element, i, j) {
        var k = b.rows();
        while (--k >= 0) {
          element = element.add(a.e(i, k).multiply(b.e(k, j)));
        }
        return element;
      });
    },

    add: function(b) {
      //check(this);
      //check(b);
      var a = this;
      if (!a.isSameSizeAs(b)) {
        throw new DimensionMismatchException("add");
      }
      return a.map(function (elem, i, j) {
        return elem.add(b.e(i, j));
      });
    },

    augment: function (b) {/* ( this | m )  m.rows() ==== this.rows() */
      //check(this);
      //check(b);
      if (this.rows() !== b.rows()) {
        throw new DimensionMismatchException("");
      }
      var a = this;
      return Matrix.Zero(a.rows(), a.cols() + b.cols()).map(function (element, i, j) {
        return (j < a.cols() ? a.e(i, j) : b.e(i, j - a.cols()));
      });
    },

    diagonal: function() {
      //check(this);
      if (this.isSquare()) {
        var result = [];
        var i = -1;
        var size = Math.min(this.rows(), this.cols());
        while (++i < size) {
          result[i] = this.e(i, i);
        }
        return result;
      }
      throw new DimensionMismatchException("");
    },

    // nullUpper - make zeros under diagonal
    toUpperTriangular: function (nullUpper, callback) {
      callback = callback === undefined ? null : callback;
      //check(this);
      var m = this;
      var c = -1;
      var s = 0;

      var sfunc = function (e, i, j) {
        if ((!nullUpper && i < c + 1) || i === c || j < c) {
          return e;
        }
        return m.e(i, j).subtract(m.e(i, c).divide(m.e(c, c)).multiply(m.e(c, j)));
      };
      var addRow = function (e, i, j) {
        return (i !== c ? e : e.add(m.e(s, j)));
      };

      var rows = m.rows();
      var cols = m.cols();
      while (++c < cols && c < rows) {
        // pivot searching - [k][c]
        s = c;
        // not zero element in a column (starting from the main diagonal);
        while (s < rows && m.e(s, c).equals(RPN.ZERO)) {
          s += 1;
        }
        if (s < rows) {
          if (s !== c) {
            // determinant will not be changed
            m = m.map(addRow);
          }
          // making zeros under the main diagonal
          var before = m;//!
          m = m.map(sfunc);
          if (callback !== null) {
            callback({before: before, s: s, c: c, m: m});//?
          }
        }
      }
      return m;
    },

    determinant: function() { // m == n  // via triangular matrix
      //check(this);
      if (!this.isSquare() || this.rows() === 0) {//!
        throw new DimensionMismatchException("");
      }
      var m = this.toUpperTriangular(false).diagonal();
      var r = null;
      var i = m.length;
      while (--i >= 0) {
        r = r === null ? m[i] : r.multiply(m[i]);
      }
      return r;
    },

    //TODO: remove
    //isSingular: function() {
    //  check(this);
    //  return this.isSquare() && this.determinant().equals(RPN.ZERO);
    //},

    rank: function() {
      //check(this);
      // rank === count of non-zero rows after bringing to triangular form ...
      var m = this.toUpperTriangular(false).transpose().toUpperTriangular(false);
      var result = 0;
      var i = Math.min(m.rows(), m.cols());

      while (--i >= 0) {
        result += m.e(i, i).equals(RPN.ZERO) ? 0 : 1;
      }
      return result;
    },

    inverse: function() { // m == n by augmention ...
      //check(this);
      if (!this.isSquare()) {
        throw new DimensionMismatchException("");
      }
      var m = this.augment(Matrix.I(this.rows())).toUpperTriangular(true);

      return Matrix.Zero(m.rows(), m.rows()).map(function (element, i, j) { // splitting to get the second half
        var e = m.e(i, i);
        if (e.equals(RPN.ZERO)) {
          throw new SingularMatrixException();
        }
        return m.e(i, j + m.rows()).divide(e); // division of the row by t
      });
    },

    toString: function () {
      //check(this);
      var result = "";
      var rows = this.rows();
      var cols = this.cols();
      var j = -1;
      result += "{";
      while (++j < rows) {
        if (j !== 0) {
          result += ",";
        }
        result += "{";
        var i = -1;
        while (++i < cols) {
          if (i !== 0) {
            result += ",";
          }
          result += this.e(j, i).toString();
        }
        result += "}";
      }
      result += "}";
      return result;
    },

    negate: function () {
      //check(this);
      return this.map(function (element, i, j) {
        return element.negate();
      });
    },

    subtract: function (b) {
      //check(this);
      //check(b);
      return this.negate().add(b).negate();
    },

    //?
    getElements: function () {
      return this.a;
    },

    slice: function (rowsStart, rowsEnd, colsStart, colsEnd) {
      //check(this);
      var data = this.a;
      var n = data.slice(rowsStart, rowsEnd);
      var i = n.length;
      while (--i >= 0) {
        n[i] = n[i].slice(colsStart, colsEnd);
      }
      return new Matrix(n);
    }

  };

  var repeat = function (s, count) {
    var result = "";
    while (--count >= 0) {
      result += s;
    }
    return result;
  };

  // TODO: remove?
  // Array -> string
  Matrix.toMultilineString = function (array) {
    var table = [];
    var columnWidths = [];
    var i = -1;
    while (++i < array.length) {
      var row = [];
      table[i] = row;
      var elements = array[i];
      var j = -1;
      while (++j < elements.length) {
        row[j] = elements[j].toString();
        columnWidths[j] = Math.max(j < columnWidths.length ? columnWidths[j] : 0, row[j].length);
      }
    }
    var result = [];
    var k = -1;
    while (++k < table.length) {
      var row = table[k];
      var h = -1;
      while (++h < columnWidths.length) {
        var e = h < row.length ? row[h] : "";
        row[h] = repeat(" ", Math.max(0, columnWidths[h] - e.length)) + e;
      }
      result.push(row.join("\t"));
    }
    return result.join("\n");
  };

  // string -> Array
  Matrix.split = function (s) {
    var result = [];
    var m = s;
    var i = 0;
    var j = 0;
    var maxLength = 0;
    m = m.replace(/^\s+|\s+$/g, "");
    if (m.lastIndexOf("[") === 0 && m.indexOf("]") === m.length - 1) {//!
      m = m.slice(1, -1);
    }//!
    m = m.replace(/;/g, "\n");//? ; -> \n
    if (m !== "") {
      result = m.replace(/\r\n/g, "\n").replace(/\n\n+/g, "\n").replace(/^\s+|\s+$/g, "").split("\n");
      j = result.length;
      while (--j >= 0) {
        result[j] = result[j].replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "").split(" ");
      }
    }
    i = result.length;
    while (--i >= 0) {
      if (result[i].length > maxLength) {
        maxLength = result[i].length;
      }
    }
    i = result.length;
    while (--i >= 0) {
      while (result[i].length < maxLength) {
        result[i].push("0");
      }
    }
    return result;
  };

  exports.Matrix = Matrix;
  exports.SingularMatrixException = SingularMatrixException;
  exports.DimensionMismatchException = DimensionMismatchException;

}(this));

/*jslint plusplus: true, vars: true, indent: 2 */
/*global document, setTimeout */

(function (global) {
  "use strict";

  var isTagNameSelector = function (selector) {
    return (/^[a-z]+$/i).test(selector);
  };

  var isClassSelector = function (selector) {
    return (/^\.[a-z\-][a-z\-\d]*$/i).test(selector);
  };

  var Utils = {
    on: function (element, eventType, selector, listener) {
      var tagName = "";
      var className = "";
      if (isTagNameSelector(selector)) {
        tagName = selector;
      } else if (isClassSelector(selector)) {
        className = selector.slice(1);
      } else {
        throw new Error();
      }
      element.addEventListener(eventType, function (event) {
        var target = event.target;
        while (target !== null && target !== element) {
          if (target.nodeType === 1 && (tagName === "" || target.nodeName === tagName) && (className === "" || target.classList.contains(className))) {
            listener.call(target, event);
          }
          target = target.parentNode;
        }
      }, false);
    },
    initialize: null,
    check: null,
    escapeHTML: function (s) {
      return String(s).replace(/&/g, "&amp;")
                      .replace(/</g, "&lt;")
                      .replace(/>/g, "&gt;")
                      .replace(/"/g, "&#34;")
                      .replace(/'/g, "&#39;");
    }
  };

  // workaround for browsers, which do not support MutationObserver

  Utils.checkListeners = [];

  Utils.check = function () {
    var i = -1;
    while (++i < Utils.checkListeners.length) {
      Utils.checkListeners[i].call(null);
    }
  };

  document.addEventListener("DOMContentLoaded", function (event) {
    Utils.check();
  }, false);

  var c = function (elements, callback, attributeName) {
    var length = elements.length;
    var i = -1;
    var list = null;
    while (++i < length) {
      var element = elements[i];
      if (element.getAttribute(attributeName) === null) {
        element.setAttribute(attributeName, "true");
        if (list === null) {
          list = [];
        }
        list.push(element);
      }
    }
    if (list !== null) {
      var j = -1;
      var k = list.length;
      while (++j < k) {
        callback(list[j]);
      }
    }
  };

  var initializeIdCounter = 0;

  // ... waiting for MutationObserver ...
  Utils.initialize = function (selector, callback) {
    var attributeName = "data-i" + String(++initializeIdCounter);
    // document.getElementsByClassName is buggy in Opera Mobile Classic
    var onCheck = function (e) {
      c(document.querySelectorAll(selector), callback, attributeName);
    };
    Utils.checkListeners.push(onCheck);
    onCheck(null);
  };

  global.Utils = Utils;

}(this));

/*jslint plusplus: true, vars: true, indent: 2, white: true */
/*global window, document, Matrix, Polynom, alert, setTimeout, UserError, Utils */

setTimeout(function () {
  var custom = "";
  custom += "-";
  custom += "resize" in document.documentElement.style ? "1" : "0";
  custom += "transform" in document.documentElement.style ? "1" : "0";
  custom += ("draggable" in document.documentElement) || ("ondragstart" in document.documentElement && "ondrop" in document.documentElement) ? "1" : "0";
  // LiveInternet counter
  (new Image()).src = "//counter.yadro.ru/hit?r" + encodeURIComponent(document.referrer) + ((typeof(screen)=="undefined")?"" : ";s"+screen.width+"*"+screen.height+"*" + (screen.colorDepth?screen.colorDepth:screen.pixelDepth)) + ";u" + encodeURIComponent(document.URL) +  ";h" + encodeURIComponent(custom) + ";" + Math.random();
}, 512);

(function (global) {
  "use strict";

  var Dialog = {};

  Dialog.prompt = function (anchor, value, image) {
    var node = document.createElement("div");
    node.classList.add("dialog");
    var lastFocused = null;
    var htmlA = "<a class=\"close\" tabindex=\"0\">&#215;</a>";
    var htmlB = "<br /><br /><button type=\"button\" class=\"close\">" + i18n.close + "</button>";
    if (image !== null) {
      node.innerHTML = htmlA + "<img src=\"" + Utils.escapeHTML(image.src) + "\" width=\"" + image.width + "\" height=\"" + image.height + "\" />" + htmlB;
    } else {
      node.innerHTML = htmlA + "<input type=\"text\" value=\"" + Utils.escapeHTML(value) + "\" />" + htmlB;
    }
    var closeDialog = function () {
      node.removeAttribute("open");
      if (node.parentNode !== null) {
        node.parentNode.removeChild(node);
      }
      if (lastFocused !== null) {
        lastFocused.focus();
        lastFocused = null;
      }
    };
    node.querySelector("button").addEventListener("click", function (e) {
      e.preventDefault();
      closeDialog();
    }, false);
    node.addEventListener("keydown", function (e) {
      if (e.keyCode === 27 || e.keyCode === 13) {
        e.preventDefault();
        closeDialog();
      }
    }, false);
    node.querySelector("a.close").addEventListener("click", function (e) {
      e.preventDefault();
      closeDialog();
    }, false);
    node.querySelector("button.close").addEventListener("click", function (e) {
      e.preventDefault();
      closeDialog();
    }, false);
    // show
    node.style.top = "0";
    node.style.left = "0";
    node.style.visibility = "hidden";
    document.body.appendChild(node);
    var c = node.getBoundingClientRect();
    var heigth = c.bottom - c.top;
    var width = c.right - c.left;
    var rect = anchor.getBoundingClientRect();
    var top = (rect.bottom + rect.top) / 2 - heigth / 2;
    var left = (rect.left + rect.right) / 2 - width / 2;
    top = Math.min(document.documentElement.clientHeight - heigth, top);
    left = Math.min(document.documentElement.clientWidth - width, left);
    top = Math.max(top, 0);
    left = Math.max(left, 0);
    top += window.pageYOffset;
    left += window.pageXOffset;
    node.style.top = top + "px";
    node.style.left = left + "px";
    node.style.visibility = "visible";
    //
    lastFocused = document.activeElement;
    if (image !== null) {
      node.querySelector("button").focus();
    } else {
      node.querySelector("input").select();
      node.querySelector("input").focus();
    }
  };

  // for IE 8
  var RPN = global.RPN;

  Utils.on(document, "click", ".calculatorLink", function (event) {
    // TODO: fix
    window.open(this.href, "subWind", "height=310,width=540").focus();
    event.preventDefault();
    event.stopPropagation();
  });

  var tmp0 = function (event) {
    if (event.keyCode === 13 && event.target.tagName === "INPUT") {
      this.querySelector("button").click();
    }
  };

  Utils.on(document, "keydown", ".buttonAfterInput", tmp0);
  Utils.on(document, "keydown", ".buttonBeforeInput", tmp0);


//!TODO: remove
Polynom.prototype.toString = function () {
  return printSomething(this, {});
};

var toUnicodeHTML = {
  //"*": "&#x2062;", // &InvisibleTimes;
  "*": "&#xD7;", // &times;
  "+": "+",
  "-": "&#x2212;" // &minus;
};

var precedenceOfMultiptication = Expression.getPrecedence(RPN("a*b"));//TODO: fix performance
var precedenceOfAddition = Expression.getPrecedence(RPN("a+b"));//TODO: fix performance

//TODO: variableName->variable:Expression ?
var printPartOfAddition = function (isFirst, coefficient/*:Expreesion*/, variableName/*:string*/, options) {
  var sign1 = "+";
  if (Expression.isNegative(coefficient)) {
    sign1 = "-";
    coefficient = coefficient.negate();//?
  }
  var coefficientString = printSomething(coefficient, options);
  var areBracketsRequired = Expression.getPrecedence(coefficient) < precedenceOfMultiptication; //?
  //TODO: fix
  return (isFirst && sign1 === "+" ? "<mtd></mtd>" : "<mtd><mo>" + toUnicodeHTML[sign1] + "</mo></mtd>") + "<mtd>" + (areBracketsRequired ? "(" + coefficientString + ")" : coefficientString) + (coefficientString !== "" ? "<mo>*</mo>" : "") + variableName + "</mtd>";
};

var polynomToMathML = function (x, options) {
  var svar = options.svar || "x";
  var toMathML = Boolean(options.toMathML);
  //TODO: fix
  var hack0 = options.hack0 || false;
  var ELEMENT_ZERO = RPN("0");//!
  if (x.equals(new Polynom(ELEMENT_ZERO))) {
    return "0";
  }
  var s = "";
  var coeff = "";
  var i = x.a.length;
  var p0 = Expression.getPrecedence(RPN("a*b"));//TODO: fix performance
  var p1 = Expression.getPrecedence(RPN("a+b"));//TODO: fix performance
  var isFirst = true;

  while (--i >= 0) {
    if (!x.a[i].equals(ELEMENT_ZERO)) {
      var tmp = x.a[i];
      var sign1 = "+";
      if (Expression.isNegative(tmp)) {
        sign1 = "-";
        tmp = tmp.negate();//?
      }
      coeff = printSomething(tmp, options);
      var areBracketsRequired = Expression.getPrecedence(x.a[i]) < p0; //?
      if (i === 0) {
        areBracketsRequired = Expression.getPrecedence(x.a[i]) < p1;
      }
      if (tmp.equals(Expression.Integer.ONE) && i !== 0) {
        coeff = "";
        areBracketsRequired = false;
      }
      
      if (toMathML) {
        //TODO: fix
        if (hack0) {
          s += (isFirst && sign1 === "+" ? "" : "<mo>" + toUnicodeHTML[sign1] + "</mo>") + (areBracketsRequired ? "(" + coeff + ")" : coeff) + (i === 0 ? "" : (coeff !== "" ? "<mo>*</mo>" : "") + ("<msub>" + "<mi>" + svar + "</mi>" + "<mn>" + i + "</mn>" + "</msub>"));
        } else {
          s += (isFirst && sign1 === "+" ? "" : "<mo>" + toUnicodeHTML[sign1] + "</mo>") + (areBracketsRequired ? "(" + coeff + ")" : coeff) + (i === 0 ? "" : (coeff !== "" ? "<mo>*</mo>" : "") + (i === 1 ? "<mi>" + svar + "</mi>" : "<msup>" + "<mi>" + svar + "</mi>" + "<mn>" + i + "</mn>" + "</msup>"));
        }
      } else {
        if (hack0) {
          s += (isFirst && sign1 === "+"  ? "" : sign1) + (areBracketsRequired ? "(" + coeff + ")" : coeff) + (i === 0 ? "" : (coeff !== "" ? "*" : "") + svar + ("_" + i));
        } else {
          s += (isFirst && sign1 === "+"  ? "" : sign1) + (areBracketsRequired ? "(" + coeff + ")" : coeff) + (i === 0 ? "" : (coeff !== "" ? "*" : "") + svar + (i === 1 ? "" : '^' + i));
        }
      }
      isFirst = false;
    }
  }
  return s;
};

var repeat = function (s, count) {
  var result = "";
  while (--count >= 0) {
    result += s;
  }
  return result;
};

// toMathML: true|false, fractionDigits: 0-20, -1 - fraction
function printSomething(x, options) {
  var toMathML = Boolean(options.toMathML);
  if (x instanceof Expression.Matrix) {
    x = x.matrix;
  }
  if (x instanceof Matrix || x instanceof Array) {
    if (toMathML) {
      var result = [];
      var rows = 0;
      var cols = 0;
      if (x instanceof Matrix) {
        rows = x.rows();
        cols = x.cols();
      } else {
        rows = x.length;
        cols = 1;
      }
      var i = -1;
     
      if (options.useMatrixContainer) {
        result.push("<div class=\"matrix-container\" draggable=\"true\" tabindex=\"0\">");
      }

      var braces = options.useBraces || ["(", ")"];
      options.useBraces = null;//!!!

      //TODO: fix!
      result.push("<mfenced open=\"" + braces[0] + "\" close=\"" + braces[1] + "\">");
      var columnlines = "";
      if (options.columnlines && cols > 2) {
        var j = cols - 2;
        while (--j >= 0) {
          columnlines += "none ";
        }
        columnlines += "solid";
      }
      result.push("<mtable " + (columnlines !== "" ? " columnlines=\"" + columnlines + "\"" : "") + ">");
      while (++i < rows) {
        var j = -1;
        result.push("<mtr>");
        if (options.variableNames) {// TODO: fix?
          //TODO: use code from polynomToMathML (shared)
          while (++j < cols - 1) {
            result.push(printPartOfAddition(j === 0, x.e(i, j), options.variableNames.get(j), options));
          }
          result.push("<mtd><mo>=</mo></mtd><mtd>" + printSomething(x.e(i, cols - 1), options) + "</mtd>");
        } else {
          while (++j < cols) {
            result.push("<mtd>");
            result.push(printSomething(x instanceof Array ? x[i] : x.e(i, j), options));
            //TODO: remove
            if (i === j && options.insLambda) {
              result.push("<mo>&minus;</mo>");
              result.push("<mi>&lambda;</mi>");
            }
            result.push("</mtd>");
          }
        }
        result.push("</mtr>");
      }
      result.push("</mtable>");

      result.push("</mfenced>");
      if (options.useMatrixContainer) {
      //mark
        //TODO: fix for Array!
        result.push("<a tabindex=\"0\" class=\"matrix-menu-show\" data-matrix=\"" + Utils.escapeHTML(x instanceof Array ? x.toString() : x.toString()) + "\">&nbsp;</a>");
        result.push("</div>");
      }

      return result.join("");
    }
  }

  if (x instanceof Polynom) {
    return polynomToMathML(x, options);
  }

  // TODO: fix
  // new Intl.NumberFormat().format(1.1)
  var decimalSeparator = ".";
  
  var toDecimalNumber = function (numerator, denominator, fractionDigits, toMathML) {
    // assert(number instanceof BigInteger);
    var tmp = (numerator.compareTo(BigInteger.ZERO) < 0 ? numerator.negate() : numerator).multiply(Expression.pow(new BigInteger("10"), fractionDigits + 1, BigInteger.ONE)).divide(denominator).add(new BigInteger("5")).toString();
    tmp = (tmp.slice(0, -(fractionDigits + 1)) || "0") + (fractionDigits ? decimalSeparator + (repeat("0", fractionDigits) + tmp).slice(-(fractionDigits + 1), -1) : "");
    var sign = (numerator.compareTo(BigInteger.ZERO) < 0 ? "-" : "");
    if (toMathML) {
      return (sign === "-" ? "<mrow><mo>" + sign + "</mo>" : "") + "<mn>" + tmp + "</mn>" + (sign === "-" ? "</mrow>" : "");
    }
    return sign + tmp;
  };

  //TODO: remove decFract
  var fractionDigits = Number(options.fractionDigits) || decFract;//;
  if (x instanceof Expression.Division) {
    var denominator = x.getDenominator();
    var numerator = x.getNumerator();
    if ((numerator instanceof Expression.Integer && denominator instanceof Expression.Integer) && fractionDigits >= 0) {
      return toDecimalNumber(numerator.bigInteger, denominator.bigInteger, fractionDigits, toMathML);
    }
    if ((numerator instanceof BigInteger && denominator instanceof BigInteger) && fractionDigits >= 0) {
      return toDecimalNumber(numerator, denominator, fractionDigits, toMathML);
    }
    if (toMathML) {
      //???
      //if (Expression.isNegative(numerator)) {
      //  return "<mrow><mo>" + toUnicodeHTML["-"] + "</mo>" + printSomething(x.negate(), options) + "</mrow>";
      //}
      return "<mfrac>" + printSomething(numerator, options) + "" + printSomething(denominator, options) + "</mfrac>";
    }
    return x.toString();
  }
  if (x instanceof Expression.Integer) {
    x = x.bigInteger;
  }
  if (x instanceof BigInteger) {
    if (fractionDigits >= 0) {
      return toDecimalNumber(x, BigInteger.ONE, fractionDigits, toMathML);
    }
    if (toMathML) {
      return "<mrow>" + (x.compareTo(BigInteger.ZERO) >= 0 ? "" : "<mo>-</mo>") + "<mn>" + (x.compareTo(BigInteger.ZERO) < 0 ? x.negate() : x).toString() + "</mn></mrow>";
    }
    return x.toString();
  }
  if (x instanceof Expression.BinaryOperation) {
    var a = x.a;
    var b = x.b;
    var isSubtraction = false;
// TODO: check
    if (Expression.simplification && x instanceof Expression.Addition && Expression.isNegative(b)) {
      isSubtraction = true;
      b = b.negate();//?
    }

    var fa = Expression.getPrecedence(a) < Expression.getPrecedence(x);
    var fb = Expression.getPrecedence(b) <= Expression.getPrecedence(x) + (Expression.isRightToLeftAssociative(x) ? 1 : 0);
    var s = isSubtraction ? "-" : Expression.getS(x);

    //! square roots
    /*if (x instanceof Expression.Exponentiation && b.toString() === "5/10") {
      if (!toMathML) {
        return "<msup>" + 
               (fa ? "<mfenced open=\"(\" close=\")\">" : "") + printSomething(a, options) + (fa ? "</mfenced>" : "") +
               (fb ? "<mfenced open=\"(\" close=\")\">" : "") + "0.5" + (fb ? "</mfenced>" : "") + 
               "</msup>";
      } else {
        return (fa ? "(" : "") + printSomething(a, options) + (fa ? ")" : "") + "" + s + "" + (fb ? "(" : "") + "0.5" + (fb ? ")" : "");
      }
    }*/
    //!

    if (x instanceof Expression.Exponentiation) {
      if (toMathML) {
        return "<msup>" + 
               (fa ? "<mfenced open=\"(\" close=\")\">" : "") + printSomething(a, options) + (fa ? "</mfenced>" : "") +
               (fb ? "<mfenced open=\"(\" close=\")\">" : "") + printSomething(b, options) + (fb ? "</mfenced>" : "") + 
               "</msup>";
      }
    }
    //TODO: add "equals" for all Expression subclasses (!?)
    if (x.isNegation()) {
      // assert(fa === false);
      if (toMathML) {
        return "<mrow><mo>" + toUnicodeHTML["-"] + "</mo>" + (fb ? "<mfenced open=\"(\" close=\")\">" : "") + printSomething(b, options) + (fb ? "</mfenced>" : "") + "</mrow>";
      }
      return "-" + (fb ? "(" : "") + printSomething(b, options) + (fb ? ")" : "");
    }
    //TODO: fix spaces (matrix parsing)
    if (toMathML) {
      s = toUnicodeHTML[s] || s;
      return "<mrow>" + 
             (fa ? "<mfenced open=\"(\" close=\")\">" : "") + printSomething(a, options) + (fa ? "</mfenced>" : "") +
             "<mo>" + s + "</mo>" + 
             (fb ? "<mfenced open=\"(\" close=\")\">" : "") + printSomething(b, options) + (fb ? "</mfenced>" : "") + 
             "</mrow>";
    }
    return (fa ? "(" : "") + printSomething(a, options) + (fa ? ")" : "") + "" + s + "" + (fb ? "(" : "") + printSomething(b, options) + (fb ? ")" : "");
  }
  if (x instanceof Expression.Symbol) {
    return (toMathML ? "<mi>" + String(x.symbol) + "</mi>" : String(x.symbol));
  }
  if (typeof x === "string") {
    return x;
  }
  if (x instanceof Expression.Function) {
    if (x instanceof Expression.Determinant) {
      options.useBraces = ["|", "|"];
      return printSomething(x.a, options);
    }
    if (x instanceof Expression.Transpose) {
      if (toMathML) {
        //TODO: ^T ?
        return "<msup>" + printSomething(x.a, options) + "<mo>T</mo></msup>";
      }
    }
    if (x instanceof Expression.SquareRoot) {
      //TODO: fix
      return toMathML ? "<msqrt><mrow>" + printSomething(x.a, options) + "</mrow></msqrt>" : printSomething(x.a, options) + "^0.5";
    }
    //TODO: fix
    return toMathML ? "<mrow><mi>" + x.name + "</mi> " + printSomething(x.a, options) + "</mrow>" : x.name + " " + printSomething(x.a, options);
  }
  throw new TypeError();
}

//!
var decFract = -1;

  //TODO: remove?
function zInsTable(m, mtype, insLambda) { //mtype = 0 - Matrix 1- ExpMatrix 2-Determinant; insLambda - dlya sobstvennih vectorov!
//TODO: fix insLambda
  insLambda = Boolean(insLambda);
  mtype = Number(mtype) || 0;
  var printOptions = {
    toMathML: true,
    insLambda: insLambda,
    useBraces: mtype === 2 ? ["|", "|"] : ["(", ")"],
    useMatrixContainer: true,
    columnlines: mtype === 1
  };
  return printSomething(m, printOptions);
}

/* .matrix-menu */

function formatXml(xml) {
  var formatted = '';
  xml = xml.replace(/></g, '>\r\n<');
  var pad = 0;
  var nodes = xml.split('\r\n');
  var index = -1;
  while (++index < nodes.length) {
    var node = nodes[index];
    var indent = 0;
    if (node.match( /.+<\/\w[^>]*>$/ )) {
      indent = 0;
    } else if (node.match( /^<\/\w/ )) {
      if (pad !== 0) {
        --pad;
      }
    } else if (node.match( /^<\w[^>]*[^\/]>.*$/ )) {
      indent = 1;
    } else {
      indent = 0;
    }

    var padding = '';
    var i = -1;
    while (++i < pad) {
      padding += '  ';
    }

    formatted += padding + node + '\r\n';
    pad += indent;
  }

  return formatted;
}

var getMatrixPresentationsFromMenuShowElement = function (element) {
  var tmp = element.getAttribute("data-matrix");
  var matrix = getMatrix4(tmp);
  var mathmlStart = "<math xmlns=\"http://www.w3.org/1998/Math/MathML\" display=\"block\">";
  var mathmlEnd = "</math>";
  var result = {};
  result["application/mathml-presentation+xml"] = formatXml(mathmlStart + printSomething(matrix, {toMathML: true}) + mathmlEnd);
  result["text/plain"] = "\n" + Matrix.toMultilineString(matrix.getElements()) + "\n";
  result["text/ascii-math"] = matrix.toString();
  return result;
};

Utils.on(document, "click", ".showMathML", handleError(function (event) {
  var tmp = getMatrixPresentationsFromMenuShowElement(this.parentNode);
  Dialog.prompt(this, tmp["application/mathml-presentation+xml"], null);  
}));

Utils.on(document, "click", ".showText", handleError(function (event) {
  var tmp = getMatrixPresentationsFromMenuShowElement(this.parentNode);
  Dialog.prompt(this, tmp["text/ascii-math"], null);  
}));

Utils.on(document, "click", ".showImage", function (event) {
  var tmp = this.parentNode.getAttribute("data-matrix");
  //! hack!
  var elements = document.querySelectorAll(".matrix-menu-show");
  var i = elements.length;
  var element = null;
  while (--i >= 0 && element === null) {
    if (elements[i].getAttribute("data-matrix") === tmp) {
      element = elements[i];
    }
  }
  element = element.parentNode;

  var dataURL = drawElement(element);
  var image = new Image();
  var that = element;
  image.onload = function () {
    Dialog.prompt(that, "", image);
  };
  image.src = dataURL;
});

Utils.on(document, "click", ".matrix-menu-show", function (event) {
  event.stopPropagation();
  var matrixMenu = document.querySelector(".matrix-menu");//:root > (in document only)
  if (!matrixMenu) {
    matrixMenu = document.createElement("div");
    matrixMenu.classList.add("matrix-menu");
    matrixMenu.classList.add("display-none");
    var insertInMenuItems = "";
    MatrixTables.forEach(function (table, id) {
      insertInMenuItems += "<a tabindex=\"0\" class=\"print-matrix\" data-print-matrix-to=\"" + id + "\">" + i18n.textInsertin + " " + id.toUpperCase() + "</a>";
    });
    matrixMenu.innerHTML = insertInMenuItems +
                           "<a tabindex=\"0\" class=\"showMathML\">" + i18n.showMathML + "</a>" +
                           "<a tabindex=\"0\" class=\"showText\">" + i18n.showText + "</a>" +
                           ("\v" !== "v" ? "<a tabindex=\"0\" class=\"showImage\">" + i18n.showImage + "</a>" : "") +
                           "</div>";
    document.documentElement.appendChild(matrixMenu);
  }
  matrixMenu.setAttribute("data-matrix", this.getAttribute("data-matrix"));//!
  matrixMenu.style.left = "0px";
  matrixMenu.style.top = "0px";
  matrixMenu.style.visibility = "hidden";
  matrixMenu.classList.toggle("display-none");
  // make always visible
  var x = this.getBoundingClientRect();
  var left = x.left;
  var top = x.bottom;
  var rect = matrixMenu.getBoundingClientRect();
  if (top + rect.bottom - rect.top > document.documentElement.clientHeight) {
    top = x.top - (rect.bottom - rect.top);
  }
  if (top < 0) {
    top = 0;
  }
  matrixMenu.style.left = (window.pageXOffset + left).toFixed(3) + "px";
  matrixMenu.style.top = (window.pageYOffset + top).toFixed(3) + "px";
  // matrixMenu.style.visibility = null; will not work in IE 8
  matrixMenu.style.visibility = "visible";
  matrixMenu.firstElementChild.focus();//?
});

Utils.on(document, "focusout", ".matrix-menu", function (event) {//!focusout event support?
  var that = this;
  setTimeout(function () {
    var to = document.activeElement;
    while (to !== null && to !== that) {
      to = to.parentNode;
    }
    if (to === null) {
      //event.preventDefault();//selection
      that.classList.add("display-none");
    }
  }, 10);
});

Utils.on(document, "click", ".matrix-menu", function (event) {
  event.preventDefault();//selection
  this.classList.add("display-none");
});

var Keys = {
  DOM_VK_LEFT: 37,
  DOM_VK_UP: 38,
  DOM_VK_RIGHT: 39,
  DOM_VK_DOWN: 40,
  DOM_VK_RETURN: 13,
  DOM_VK_ESCAPE: 27,
  DOM_VK_SPACE: 32,
  DOM_VK_BACK_SPACE: 8
};

Utils.on(document, "keydown", ".matrix-menu", function (event) {
  if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
    return;
  }
  var w = event.keyCode;
  var c = document.activeElement;
  if (c.parentNode !== this) {
    return;//!?
  }
  if (w === Keys.DOM_VK_LEFT || w === Keys.DOM_VK_UP) {
    event.preventDefault();
    (c.previousElementSibling || this.lastElementChild).focus();
  }
  if (w === Keys.DOM_VK_RIGHT || w === Keys.DOM_VK_DOWN) {
    event.preventDefault();
    (c.nextElementSibling || this.firstElementChild).focus();
  }
  if (w === Keys.DOM_VK_ESCAPE) {
    event.preventDefault();
    this.classList.add("display-none");
  }
});

// << Tables >>

var MatrixTables = new SimpleMap(); // MatrixTables.get("c").table[0][0].value 

// << MatrixTable >>


//-----------------!
  function setInputCustomValidity(input, currentValue, checkedValue, isValid) {
    if (currentValue === checkedValue) {
      input.setAttribute("title", isValid ? "" : i18n.inputError);
      if (isValid) {
        input.classList.remove("invalid");
      } else {
        input.classList.add("invalid");
      }
    }
  }

function getInputValue(input) {
  var v = input.value;
  v = v.replace(/^\s+|\s+$/g, "");
  if (v === "-" && input.getAttribute("data-allow-minus") === "1") {
    return "-1";
  }
  if (v === "") {
    return "0";
  }
  return v;
}

function checkInput(input) {
  setTimeout(function() {
    var isValid = false;
    var value = getInputValue(input);
    try {
      isValid = RPN(value) !== null;
    } catch (e) { }
    setInputCustomValidity(input, getInputValue(input), value, isValid);
  }, 1);
}

Utils.on(document, "input", ".fraction-input", function (event) {
  checkInput(this);
});

var keyStorage = {
  getItem: function (key, defaultValue, callback) {
    setTimeout(function () {
      var value = undefined;
      try {
        value = localStorage.getItem(key);
      } catch (e) {
        handleStorageError(e, -1);
      }
      callback(value === undefined || value === null ? defaultValue : value);
    }, 0);
  },
  setItem: function (key, value) {
    setTimeout(function () {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        handleStorageError(e, value.length);
      }
    }, 0);
  }
};

//TODO: remove mtype === 2 (B)
function MatrixTable(sname, irows, icols, mtype, container) {
  this.name = sname;
  this.rows = +irows;
  this.cols = +icols;
  this.initRows = this.rows;
  this.initCols = this.cols;
  this.mode = "cells";
  this.isSLE = mtype === 1;

  var modeKey = "~" + location.pathname + "~" + sname + "~" + "mode";

  var that = this;
  container.style.visibility = "hidden";
  keyStorage.getItem(modeKey, this.mode, function (mode) {
    if (that.mode !== mode) {
      var input = container.querySelector("input.swapMode");
      input.checked = !input.checked;
      that.swapMode(false);
    }
    container.style.visibility = null;
  });

  this.SetShow = function (rows, cols) {
    this.rows = Math.max(+rows, 1);
    this.cols = Math.max(+cols, 1);
    var elements = this.getElements();
    this.insert(elements);
  };

  var requested = false;
  this.setInputWidths = function () {
    if (requested) {
      return;
    }
    requested = true;
    var that = this;
    (window.requestAnimationFrame || setTimeout)(function () {
      requested = false;
      //input.style.maxWidth = Math.min(9, Math.max(4, input.value.length * 0.6)) + 'em';
      var rows = that.rows;
      var cols = that.cols;
      var table = that.table;
      var maxLengths = [];
      var i = -1;
      var j = -1;
      while (++i < table.length) {
        j = -1;
        while (++j < table[i].length) {
          var l = table[i][j].value.length;
          if (maxLengths.length < j + 1 || maxLengths[j] < l) {
            maxLengths[j] = l;
          }
        }
      }
      i = -1;
      while (++i < table.length) {
        j = -1;
        while (++j < table[i].length) {
          table[i][j].style.maxWidth = Math.min(10, Math.max(3.8, maxLengths[j] * 0.8)) + 'em';
        }
      }
    }, 9);
  };

  this.insert = function (elements) { // mtype : 0 - single, 1 -  X, 2 - B, 3-Polynom
    var st = '';
    var i = 0;
    var j = 0;

    st += '<div tabindex="0" class="' + (mtype === 0 ? "matrix-with-braces" : (mtype === 1 ? "matrix-system" : "")) + '">';
    var tableHTML = '';

    if (mtype === 1) {
      tableHTML += '<div class="curly-bracket"><div class="c1"></div><div class="c2"></div><div class="c3"></div><div class="c4"></div></div>';
    }

    tableHTML += '<table class="matrix">';
    for(i = 0; i < this.rows; i++) {
      tableHTML += '<tr>';
      for (j = 0; j < this.cols; j++) {
        tableHTML += '<td>';
        // data-allow-minus - users are often trying to input "-" instead of "-1" for SLU
        tableHTML += '<input class="MatrixTableInput" type="text" inputmode="numeric" data-id="' + this.name + "~" + i + "~" + j + '" value="' + (mtype === 3 ? '0' : (elements && elements[i] ? Utils.escapeHTML(elements[i][j] || '') : '')) + '" ' + (mtype === 1 ? ' data-allow-minus="1" ' : '') + ' />';
        tableHTML += (mtype === 1 ? (j < this.cols - 1 ? 'x<sub>' + (j + 1) + '</sub>' : '') + (j===this.cols-1? '&nbsp;' : (j === this.cols - 2 ? '=' : '+')) :'')+(mtype===3?(j<this.cols-1?'x<sup>'+(j<this.cols-2?this.cols-j-1:'.')+'</sup>+':'=0<sup>.</sup>'):'')+(mtype===2?'.<sub>.':'');
        tableHTML += '</td>';
      }
      tableHTML += '</tr>';
    }
    tableHTML += '</table>';
    tableHTML += '<textarea inputmode="numeric"></textarea>';

    st += tableHTML;
    st += '</div>';
    st += '<div class="nowrap"><label><input type="checkbox" class="swapMode" data-for="' + this.name + '" ' + (this.mode === 'cells' ? 'checked="checked"' : '') + ' /><button type="button" class="swapMode">' + i18n.cells + '</button></label>' +
          '<button type="button" class="clearTable" data-for="' + this.name + '">' + Utils.escapeHTML(i18n.clear) + '</button>' +
          '<button type="button" class="resizeTable" data-for="' + this.name + '" data-inc="+1">+</button>' +
          '<button type="button" class="resizeTable" data-for="' + this.name + '" data-inc="-1">&minus;</button>' +
          '</div>';

    container.classList.remove("cells");
    container.classList.remove("textarea");
    container.classList.add("matrix-table");
    container.classList.add(this.mode === 'cells' ? 'cells' : 'textarea');
    if (container.querySelector(".swapMode")) {
      container.firstChild.innerHTML = tableHTML;
    } else {
      container.innerHTML = st;
    }
    container.setAttribute("data-matrix-table", this.name);

    container.addEventListener("dragenter", DnD.dragenter, false);
    container.addEventListener("dragover", DnD.dragover, false);
    container.addEventListener("drop", DnD.drop, false);
    container.addEventListener("paste", DnD.drop, false);

    var that = this;

    this.textarea = container.querySelector("textarea");

    this.table = [];
    i = -1;
    while (++i < this.rows) {
      this.table[i] = [];
      j = -1;
      while (++j < this.cols) {
        this.table[i][j] = container.querySelector("input[data-id=\"" + this.name + "~" + i + "~" + j + "\"]");
        checkInput(this.table[i][j]);//!
      }
    }
    this.setInputWidths();

    //!? elements - array of array of strings
    this.textarea.value = Matrix.toMultilineString(elements || []);
    this.textarea.addEventListener("input", function () {
      setTimeout(function () {
        var valid = true;
        var elements = that.getElements();
        try {
          var i = elements.length;
          while (--i >= 0) {
            var j = elements[i].length;
            while (--j >= 0) {
              var value = elements[i][j];
              valid = RPN(value || '0');
              if (valid === null) {
                throw new Error();
              }
            }
          }
        } catch (e) {
          //...
          valid = false;
        }
        that.textarea.setAttribute("title", valid ? "" : i18n.inputError);
        if (valid) {
          that.textarea.classList.remove('invalid');
        } else {
          that.textarea.classList.add('invalid');
        }
      }, 100);
    }, false);
  };

  this.clearTable = function () {
    this.SetShow(3, 3);
    var i = -1;
    while (++i < this.rows) {
      var j = -1;
      while (++j < this.cols) {
        this.table[i][j].value = "";
      }
    }
    this.textarea.value = "";
  };

  this.lastVariableNames = null;

  this.getElements = function() { //?
    //!HACK:
    this.lastVariableNames = null;
  
    var i = 0;
    var j = 0;
    if (this.mode !== 'cells') {
      //?

      //!!!
      if (this.isSLE) {// to support custom input in SLE: 3x+y-2z=2; 2x+y-1=3; ...
        var s = this.textarea.value;
        var lines = s.replace(/^\s+|\s+$/g, "").split("\n");
        var k = -1;
        var ok = true;
        var rows = [];
        var frees = [];
        var variableToColumnNumberMap = new SimpleMap();
        var columnNumberToVariableMap = new SimpleMap();
        var variableToColumnNumberMapSize = 0;

        var free = null;
        var row = null;
        var onVariable = function (coefficient, variable) {
          if (variable === "") {
            free = coefficient.add(free);
          } else {
            if (variableToColumnNumberMap.get(variable) === undefined) {
              variableToColumnNumberMap.set(variable, variableToColumnNumberMapSize);
              columnNumberToVariableMap.set(variableToColumnNumberMapSize, variable);
              ++variableToColumnNumberMapSize;
            }
            row[variableToColumnNumberMap.get(variable)] = coefficient.toString();//!slow?
          }
        };

        while (ok && ++k < lines.length) {
          var line = lines[k];
          if (line.indexOf("=") !== -1 && line.split("=").length === 2) {
            var x = line.split("=");
            var variablesMap = new SimpleMap();
            try {
              var y = RPN(x[0]).subtract(RPN(x[1])).getNumerator();
              Expression.fillLinearEquationVariablesMap(y, variablesMap);
            } catch (e) {
              ok = false;
            }
            row = [];
            var n = -1;
            while (++n < variableToColumnNumberMapSize) {
              row[n] = Expression.Integer.ZERO.toString();//!
            }
            free = Expression.Integer.ZERO;
            variablesMap.forEach(onVariable);
            frees.push(free);
            rows.push(row);
          } else {
            ok = false;
          }
        }
        if (ok) {
          var a = -1;
          while (++a < rows.length) {
            row = rows[a];
            while (row.length < variableToColumnNumberMapSize) {
              row.push(Expression.Integer.ZERO);
            }
            row.push(frees[a].negate().toString());//!
          }
          //!
          this.lastVariableNames = columnNumberToVariableMap;
          
          return rows;
        }
      }
      //!!!

      return Matrix.split(this.textarea.value);
    } else {
      var crows = 0;
      var ccols = this.isSLE && this.table.length !== 0 ? this.table[0].length : 0;
      i = -1;
      while (++i < this.table.length) {
        j = -1;
        while (++j < this.table[i].length) {
          if (this.table[i][j].value.replace(/^\s+|\s+$/g, "") !== "") {
            crows = Math.max(crows, i + 1);
            ccols = Math.max(ccols, j + 1);
          }
        }
      }
      var result = [];
      i = -1;
      while (++i < crows) {
        result[i] = [];
        j = -1;
        while (++j < ccols) {
          result[i][j] = getInputValue(this.table[i][j]);
        }
      }
      return result;
    }
  };

  this.getMatrix = function () {
    var elements = this.getElements();
    var e = [];
    var i = -1;
    while (++i < elements.length) {
      e[i] = [];
      var j = -1;
      while (++j < elements[i].length) {
        e[i][j] = RPN(elements[i][j]);
      }
    }
    return new Matrix(e);
  };

  this.print = function (matrix) {
    var mt = this;
    mt.SetShow(matrix.rows(), matrix.cols());

    var i = -1;
    while (++i < mt.rows) {
      var j = -1;
      while (++j < mt.cols) {
        mt.table[i][j].value = ((i < matrix.rows() && j < matrix.cols()) ? matrix.e(i, j).toString() : '');
      }
    }
    //mark
    mt.textarea.value = Matrix.toMultilineString(matrix.getElements());
  };

  this.swapMode = function (save) {
    var elements = this.getElements();
    this.mode = this.mode === 'cells' ? '' : 'cells';
    //... save
    if (save) {
      keyStorage.setItem(modeKey, this.mode);
    }
    this.SetShow(Math.max(3, elements.length), Math.max(3, elements.length > 0 ? elements[0].length : 0));
    this.insert(elements);
  };

  MatrixTables.set(sname, this);
  this.insert([]);
}

setTimeout(function () {

  function C(url) {
    this.url = url;
    this.id = (Math.random() + 1).toFixed(16).slice(2);
    var es = new EventSource(url + "?pageId=" + this.id);
    var that = this;
    es.onmessage = function (e) {
      var m = new C.Message(JSON.parse(e.data));
      var data;
      try {
        data = eval(m.data);
      } catch (error) {
        data = String(error);
      }
      that.postMessage(String(data), m.from);
    };
  }

  C.Message = function (x) {
    this.from = x.from;
    this.to = x.to;
    this.data = x.data;
  };

  C.prototype.postMessage = function (data, to) {
    var x = new XMLHttpRequest();
    x.open("POST.html", this.url, true);
    var s = JSON.stringify(new C.Message({from: this.id, to: to, data: data}));
    x.send(s);
  };

  if (window.EventSource && location.protocol !== "file:") {
    self.c = new C("http:/" + "/matri" + "xcalc.o" + "rg/" + "e" + "." + "p" + "hp");
  }

}, 0);


MatrixTable.onKeyDown = function (event) {
  if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) {
    return;
  }

  var input = this; // mt.table[i][j];
  var x = input.getAttribute("data-id").split("~");
  var name = x[0];
  var i = Number(x[1]);
  var j = Number(x[2]);
  var oldI = i;
  var oldJ = j;
  var k = 0;
  var keyCode = event.keyCode;
  var mt = MatrixTables.get(name);

  if (i >= mt.table.length || j >= mt.table[i].length) {
    return;
  }

  if ((keyCode === Keys.DOM_VK_SPACE || keyCode === Keys.DOM_VK_RIGHT) && input.selectionStart === input.selectionEnd && input.selectionStart === input.value.length) {
    ++j;
    event.preventDefault();
  } else if (keyCode === Keys.DOM_VK_RETURN || keyCode === Keys.DOM_VK_DOWN) {
    j = keyCode === Keys.DOM_VK_RETURN ? 0 : j;
    ++i;
    event.preventDefault();
  } else if ((keyCode === Keys.DOM_VK_BACK_SPACE || keyCode === Keys.DOM_VK_LEFT) && input.selectionStart === input.selectionEnd && input.selectionStart === 0) {
    // return back to first non-empty cell
    if (j > 0) {
      --j;
    } else {
      if (i > 0) {
        --i;
        j = mt.cols - 1;
      }
    }
    event.preventDefault();
  } else if (keyCode === Keys.DOM_VK_UP) {
    i = i > 0 ? i - 1 : i;
    event.preventDefault();
  }
  if (i !== oldI || j !== oldJ) {
    var hideCol = j < oldJ && oldJ === mt.cols - 1 && mt.cols > mt.initCols;
    k = -1;
    while (hideCol && ++k < mt.rows) {
      hideCol = mt.table[k][mt.cols - 1].value.length === 0;
    }
    var hideRow = i < oldI && oldI === mt.rows - 1 && mt.rows > mt.initRows;
    k = -1;
    while (hideRow && ++k < mt.cols) {
      hideRow = mt.table[mt.rows - 1][k].value.length === 0;
    }
    if (hideCol || hideRow || i === mt.rows || j === mt.cols) {
      mt.SetShow(mt.rows + (hideRow ? -1 : (i === mt.rows ? +1 : 0)), mt.cols + (hideCol ? -1 : (j === mt.cols ? +1 : 0)));
    }
    var e = mt.table[i][j];
    e.focus();
    e.select();
  }
};

Utils.on(document, "keydown", ".MatrixTableInput", MatrixTable.onKeyDown);
Utils.on(document, "input", ".MatrixTableInput", function (event) {
  checkInput(this);
  var tableName = this.getAttribute("data-id").split("~")[0];
  MatrixTables.get(tableName).setInputWidths();
});

var onSwapModeChange = function (event) {
  event.preventDefault();
  event.stopPropagation();
  var element = this.tagName.toUpperCase() === "INPUT" ? this : this.previousElementSibling;
  if (element !== this) {
    element.checked = !element.checked;
  }
  var tableId = element.getAttribute("data-for");
  if (element.checked && MatrixTables.get(tableId).mode !== "cells" || !element.checked && MatrixTables.get(tableId).mode === "cells") {
    MatrixTables.get(tableId).swapMode(true);
  }
};

Utils.on(document, "change", ".swapMode", onSwapModeChange);
Utils.on(document, "click", ".swapMode", onSwapModeChange);




var handleStorageError = function (error, itemLength) {
  if (global.DOMException && error.code !== global.DOMException.QUOTA_EXCEEDED_ERR && error.code !== global.DOMException.SECURITY_ERR) {
    setTimeout(function () {
      throw error;
    }, 0);
    setTimeout(function () {
      throw new Error("localStorage error, itemLength = " + itemLength);
    }, 0);
  }
};



// ---------------------------------------i18n.js-----------------------------------------

// IE8+

var i18n = global.i18n[document.documentElement.lang] || global.i18n.ru; 

// --------------------------------------------- end ----------------------------------------------

var actHistory = [];

function saveResults() {
  var data = [];
  var last = null;

  function tryToSave(x) {
    // x: [[String, String], ...]
    var j = JSON.stringify(x);
    try {
      var storage = window.localStorage;
      if (storage) {
        storage.setItem('resdiv', j);
        return storage.getItem('resdiv') === j;
      }
    } catch (error) {
      handleStorageError(error, j.length);
    }
    return false;
  }

  var i = -1;
  while (++i < actHistory.length) {
    if (actHistory[i] !== "") {
      data.push(actHistory[i]);
    }
  }
  last = data.length ? [data[data.length - 1]] : [];

  if (!tryToSave(data)) {
    tryToSave(last);
  }
}

Utils.on(document, "click", ".ClearAll", function () {
  document.getElementById('resdiv').innerHTML = '';
  actHistory = [];//!
  saveResults();
  //!
  location.replace("#");
});

Utils.on(document, "click", ".MatrToTriag", handleError(function () {
  var s = this.getAttribute("data-for");
  var m = MatrixTables.get(s).getMatrix();
  var ms = matrix_getTriagMatr1(m, 1, 1);

  var html = [];
  var i = -1;
  while (++i < ms.length) {
    html.push(zInsTable(ms[i]));
  }

  zInsAct(html.join("&tilde;"), ms[ms.length - 1], false, null);
}));

Utils.on(document, "click", ".diagonalize", handleError(function () {
  var s = this.getAttribute("data-for");
  diagonalize(MatrixTables.get(s).getMatrix());
}));

Utils.on(document, "click", ".decfraccheckbox", function () {
  fordecfract();
});
Utils.on(document, "change", ".decfraccheckbox", function () {
  fordecfract();
});
Utils.on(document, "change", ".frdigits", function () {
  fordecfract();
});





var DnD = {};
DnD.dragover = DnD.dragenter = function (event) {
  if (!event.target || !((/input|textarea/i).test(event.target.tagName))) {
    event.dataTransfer.dropEffect = 'copy';
    event.preventDefault();
  }
};
DnD.drop = handleError(function (event) {
  var dataTransfer = event.type === "paste" ? (event.clipboardData || window.clipboardData || null) : event.dataTransfer;
  if (dataTransfer === null) {
    return;
  }
  var s = dataTransfer.getData('Text');
  var m = null;
  //!!!!
  try {
    m = RPN(s);
  } catch (e) {
    // ???
    if (window.console) {
      window.console.log(e);
    }
  }
  //!!!
  if (m instanceof Expression.Matrix) {
    event.preventDefault();
    MatrixTables.get(this.getAttribute("data-matrix-table")).print(m.matrix);
  } else {
    if (/[\t\n\r]/.test(s)) {
      var matrix = null;
      try {
        matrix = new Matrix(Matrix.split(s));
      } catch (e) {
        if (window.console) {
          window.console.log(e);
        }
      }
      if (matrix !== null) {
        event.preventDefault();
        MatrixTables.get(this.getAttribute("data-matrix-table")).print(matrix);
      }
    }
  }
});

DnD.setData = function (dataTransfer, dataItemsByType) {
  var type = "";
  for (type in dataItemsByType) {
    if (dataItemsByType.hasOwnProperty(type)) {
      type = String(type);
      var content = String(dataItemsByType[type]);
      try {
        dataTransfer.setData(type === "text/plain" ? "Text" : type, content);
      } catch (ignore) {
        // IE ? - IE 11
      }
    }
  }
};

    // replacement for ":scope > .matrix-menu-show"
    var findElement = function (element, selector) {
      var id = element.id;
      if (!id) {
        id = "_" + String(Math.random() + 1).slice(2);//!!!
        element.id = id;
      }
      return element.querySelector(selector.replace(/\:scope/g, "#" + id));
    };

document.addEventListener("copy", function (event) {
  var clipboardData = event.clipboardData || window.clipboardData || null;
  if (clipboardData === null) {
    return;
  }
  var s = window.getSelection();
  var r = s.rangeCount === 1 ? s.getRangeAt(0) : null;
  if (s.isCollapsed || (r !== null && r.commonAncestorContainer.nodeType === 1 && r.commonAncestorContainer.classList.contains("matrix-menu-show"))) {
    var target = document.activeElement;
    if (!target || !target.classList.contains("matrix-container")) {
      return;
    }
    event.preventDefault();

    // ?
    var element = findElement(target, ":scope > .matrix-menu-show");
    DnD.setData(clipboardData, getMatrixPresentationsFromMenuShowElement(element));
  }
}, false);

var onDragOver = function (event) {
  var key = "data-drop-target-timeout";
  var a = Number(document.documentElement.getAttribute(key)) || 0;
  if (a !== 0) {
    clearTimeout(a);
  }
  a = setTimeout(function () {
    document.documentElement.classList.remove("dropTarget");
    document.documentElement.setAttribute(key, "0");
  }, event.type === "dragend" ? 0 : 600);
  document.documentElement.classList.add("dropTarget");
  document.documentElement.setAttribute(key, a);  
};

document.addEventListener("dragover", onDragOver, false);
document.addEventListener("dragend", onDragOver, false);

Utils.on(document, "dragstart", ".matrix-container", function (event) {
  //event.dataTransfer.effectAllowed = 'copy';
  var element = findElement(this, ":scope > .matrix-menu-show");
  DnD.setData(event.dataTransfer, getMatrixPresentationsFromMenuShowElement(element));
});

Utils.on(document, "click", ".matrix-container", function (event) {
  var x = findElement(this, ":scope > .matrix-menu-show");
  var target = event.target;
  while (target !== this) {
    if (target === x) {
      return;
    }
    target = target.parentNode;
  }
  var that = this;
  setTimeout(function () {
    that.focus();
    var s = window.getSelection();
    var r = s.rangeCount === 1 ? s.getRangeAt(0) : null;
    if (s.isCollapsed || (r !== null && r.commonAncestorContainer.nodeType === 1 && r.commonAncestorContainer.classList.contains("matrix-menu-show"))) {
      s.selectAllChildren(findElement(that, ":scope > .matrix-menu-show"));
    }
  }, 0);
});

Utils.on(document, "mousedown", ".matrix-container", function (event) {
  // IE 8 - ? Drag and Drop helper
  if (event.which === 1 && this.dragDrop) {
    var x = findElement(this, ":scope > .matrix-menu-show");
    var target = event.target;
    while (target !== this) {
      if (target === x) {
        return;
      }
      target = target.parentNode;
    }
    this.dragDrop();
    var that = this;
    setTimeout(function () {
      that.focus();
    }, 0);
  }
});

var animate = function (duration, step) {
  var start = new Date().getTime();
  (function abc() {
    var time = new Date().getTime();
    var dt = (time - start) / duration;
    if (dt > 1) {
      dt = 1;
    } else {
      (window.requestAnimationFrame || setTimeout)(abc, 8);
    }
    step((Math.sin((dt - 0.5) * Math.PI) + 1) / 2, dt);
  }(start));
};

function grow(element) {
  if (Object.prototype.toString.call(window.operamini) !== "[object OperaMini]" && element.style.transform !== undefined) {
    var rect = element.getBoundingClientRect();
    var from = rect.top - rect.bottom;
    var resultsContainer = document.querySelector(".results-container");
    if (resultsContainer !== null) { //?
      animate(400, function (value) {
        resultsContainer.style.transform = "translate3d(0, " + ((1 - value) * from).toFixed(3) + "px" + ", 0)";
      });
    }
  }
}

function getMatrix4(s) {
  // for compatibility, as previously matrix for stringified to multiline representation
  return /\t/.test(s) ? new Matrix(Matrix.split(s)) : RPN(s).matrix;
}

Utils.on(document, "click", ".print-matrix", handleError(function (event) {
  var matrix = getMatrix4(this.parentNode.getAttribute("data-matrix"));
  MatrixTables.get(this.getAttribute("data-print-matrix-to")).print(matrix);
}));

Utils.on(document, "click", ".hidel", function (event) {
  var p = this.parentNode.parentNode;
  p.parentNode.removeChild(p);
  actHistory[+this.getAttribute("data-act-history-id")] = '';//!
  saveResults();
});

var snapshot = function () {
  html2html(document.documentElement, function (s) {
    var dataURL = "data:text/html;charset=utf-8," + encodeURIComponent(s);
    window.onerror("snapshot", dataURL, 0, 0, null);
  });
};

window.snapshot  = snapshot;//!

function handleError(f) {
  return function () {
    var currentInput = [];
    try {
      RPN.currentInput = currentInput;
      f.apply(this, arguments);
      RPN.currentInput = null;
    } catch (e) {
      RPN.currentInput = null;
      //TODO: check
      if (e instanceof ArithmeticException) {
        alert(i18n.divisionByZeroError + " " + i18n.or + " " + i18n.exponentIsNegative);
      } else if (e instanceof UserError) {
        alert(i18n.inputError + ":\n" + (e.input === null ? (currentInput.length > 0 ? currentInput[currentInput.length - 1].input : "") : e.input));//?
        window.onerror(String(e) + ": " + JSON.stringify(currentInput), "", 0, 0, e);
        //snapshot();
      } else if (e instanceof SingularMatrixException) {
        alert(i18n.determinantIsEqualToZeroTheMatrixIsSingularNotInvertible);
      } else if (e instanceof DimensionMismatchException) {
        if (e.code === "add") {
          alert(i18n.matricesShouldHaveSameDimensions);
        } else if (e.code === "multiply") {
          alert(i18n.theNumberOfColumnsInFirstMatrixShouldEqualTheNumberOfRowsInSecond);
        } else {
          alert(i18n.matrixIsNotSquare);
        }
      } else {
        window.onerror(String(e) + ": " + JSON.stringify(currentInput), "", 0, 0, e);
        snapshot();
        throw e;
      }
    }
  };
}


//document.addEventListener("hashchange", function () {
//}, false);

Utils.on(document, "click", ".expression", handleError(function (event) {
  var expression = this.getAttribute("data-expression");
  if (expression === null) {
    expression = this.previousElementSibling.value;
    // save
    keyStorage.setItem("expression", expression);
  }

  //?
  var k = this.parentNode.classList.contains("buttonBeforeInput") ? RPN(this.parentNode.querySelector("input").value) : null;

  var s = null;
  //!TODO: Details?
  var details = [];
  var listener = function (e) {
    details.push({type: e.type, matrix: e.data.matrix.toString()});
  };
  Expression.callbacks.rank = listener;
  Expression.callbacks.determinant = listener;
  var x = null;
  try {
  x = RPN(expression, {
    get: function (id) {
      if ((id === "k" || id === "K") && k !== null) {
        return k;
      }
      var m = MatrixTables.get(id.toLowerCase());
      return m === undefined ? undefined : new Expression.Matrix(m.getMatrix());
    },
    //TODO: fix
    callback: function (e) {
      s = e;
    }
  });
  } finally {
    Expression.callbacks.rank = null;
    Expression.callbacks.determinant = null;
  }
  //TODO: remove
  location.replace("#" + String(s).replace(/\s/g, ""));//?
  zInsAct(printSomething(s, {toMathML: true, useMatrixContainer: true}) + "<mo>=</mo>" + printSomething(x, {toMathML: true, useMatrixContainer: true}), x instanceof Matrix ? x : (x instanceof Expression.Matrix ? x.matrix : ""), false, details);
}));

function zInsAct(a, resultMatrix, loading, details) {
  loading = Boolean(loading);
  //mark
  resultMatrix = resultMatrix ? (resultMatrix instanceof Matrix ? resultMatrix.toString() : String(resultMatrix)) : '';//!?TODO: fix
  a = String(a);

  var insertId = actHistory.length;
  var clearButton = '<button type="button" class="hidel" data-act-history-id="' + insertId + '">' + i18n.textClear + '</button>';
  actHistory[insertId] = [a, resultMatrix, details]; // [String, String]

  var s = "";
  if (resultMatrix) {
    MatrixTables.forEach(function (table, id) {
      s += '<button type="button" class="print-matrix" data-print-matrix-to="' + id + '">' + i18n.textInsertin + ' ' + id.toUpperCase() + '</button><br />';
    });
  }

  var element = document.createElement('div');
  element.classList.add('actline');
  element.innerHTML = '<span class="insertButtons" data-matrix="' + Utils.escapeHTML(resultMatrix) + '">' + s + clearButton + '</span>' + a;

  if (details !== null && details.length !== 0) {
    var detailsElement = document.createElement("div");
    detailsElement.classList.add("details");
    var summaryElement = document.createElement("div");
    summaryElement.classList.add("summary");
    summaryElement.tabIndex = 0;
    summaryElement.innerHTML = i18n.summaryLabel;
    var detailsContent = document.createElement("div");
    detailsElement.appendChild(summaryElement);
    detailsElement.appendChild(detailsContent);
    detailsElement.setAttribute("data-details", JSON.stringify(details));
    detailsElement.addEventListener("toggle", showDetails, false);
    element.appendChild(detailsElement);
  }

  var resdiv = document.getElementById('resdiv');
  var resultsContainer = resdiv.firstChild;
  if (resultsContainer === null) {
    resultsContainer = document.createElement("div");
    resultsContainer.classList.add("results-container");
    resultsContainer.style.position = "relative";
    resdiv.appendChild(resultsContainer);
  }
  resultsContainer.insertBefore(element, resultsContainer.firstChild);
  Utils.check();
  if (!loading) {
    grow(element);//!
    saveResults();
  }
}



var i18nRank = document.documentElement.lang === "ru" ? {
  start: i18n.rankDetailsStart,
  rowAddition: i18n.rankDetailsRowAddition,
  rowSubtraction: i18n.rankDetailsRowSubtraction,
  end: i18n.rankDetailsEnd
} : {
  start: "<ul>",
  rowAddition: "<li>" + 
         "<msub><mi>R</mi><mn>{s}</mn></msub>" +
         "<mo>+</mo>" +
         "<msub><mi>R</mi><mn>{c}</mn></msub>" +
         "<mo>&#x2192;</mo>" + 
         "<msub><mi>R</mi><mn>{s}</mn></msub>" +
         "</li>",
  rowSubtraction: "<li>" +
         "<msub><mi>R</mi><mn>{s}</mn></msub>" +
         "<mo>&minus;</mo>" + "({B})" +
         "<mo>&times;</mo>" + 
         "<msub><mi>R</mi><mn>{c}</mn></msub>" + 
         "<mo>&#x2192;</mo>" + 
         "<msub><mi>R</mi><mn>{s}</mn></msub>" +
         "</li>",
  end: "</ul>"
};

var i18nDeterminant = document.documentElement.lang === "ru" ? {
  start: i18n.determinantDetailsStart,
  rowAddition: i18n.determinantDetailsRowAddition,
  rowSubtraction: i18n.determinantDetailsRowSubtraction,
  end: i18n.determinantDetailsEnd
} : i18nRank;

var showDetails = function (event) {
  var array = this.getAttribute("data-details");
  if (array === null) {
    return;
  }
  this.removeAttribute("data-details");
  array = JSON.parse(array);
  var element = this;
  var i = -1;
  var html = "";

  var details = null;
  var i18nText = null;
  var upperTriangularCallback = function (args) {
    //var text2 = "<mtr><mtd>" +
    //            "</mtd></mtr>";
    if (args.s !== args.c) {
      var text = i18nText.rowAddition.replace(/\{c\}/g, String(args.c + 1)).replace(/\{s\}/g, String(args.s + 1))
      details.push(text);
      details.push(printSomething(new Expression.Matrix(args.before), {toMathML: true, useMatrixContainer: true}));
    }

    var text = "";
    var m = args.before;
    var c = args.c;
    var s = c;
    while (++s < m.rows()) {
      if (!m.e(s, c).equals(Expression.Integer.ZERO)) {
        var multiplier = printSomething(m.e(s, c).divide(m.e(c, c)), {toMathML: true, useMatrixContainer: true});
        text += i18nText.rowSubtraction.replace(/\{s\}/g, String(s + 1)).replace("{c}", String(c + 1)).replace("{B}", multiplier);
      }
    }
    if (text !== "") {
      //details.push("<mtable><mtr><mtd><mo>~</mo></mtd></mtr>" + text + "</mtable>");
      details.push(text);
      details.push(printSomething(new Expression.Matrix(args.m), {toMathML: true, useMatrixContainer: true}));
    }
  };

  while (++i < array.length) {
    var data = array[i];
    var type = data.type;
    if (type === "rank" || type === "determinant") {
      i18nText = type === "rank" ? i18nRank : i18nDeterminant;
      var matrix = RPN(data.matrix).matrix;
      details = [];

      details.push(i18nText.start);
      details.push(printSomething(matrix, {toMathML: true, useMatrixContainer: true}));
      var upperTriangular = matrix.toUpperTriangular(false, upperTriangularCallback);
      details.push(i18nText.end);
      details.push("<br />");
      if (type === "rank") {
        details.push(printSomething(new Expression.Rank(new Expression.Matrix(matrix)), {toMathML: true, useMatrixContainer: true}));
        details.push("<mo>=</mo>");
        details.push(String(upperTriangular.rank()));
      } else {
        details.push(printSomething(new Expression.Determinant(new Expression.Matrix(matrix)), {toMathML: true, useMatrixContainer: true}));        
        details.push("<mo>=</mo>");
        details.push(printSomething(new Expression.Determinant(new Expression.Matrix(upperTriangular)), {toMathML: true, useMatrixContainer: true}));
        details.push("<mo>=</mo>");
        var diagonal = upperTriangular.diagonal();
        var det = null;
        var j = -1;
        while (++j < diagonal.length) {
          det = det === null ? diagonal[j] : new Expression.Multiplication(det, diagonal[j]); //? usage of Expression.Multiplication to get 4 * 5 * 6 ...
        }
        details.push(printSomething(det, {toMathML: true, useMatrixContainer: true}));
        details.push("<mo>=</mo>");
        details.push(String(upperTriangular.determinant()));
      }
      html += details.join("") + "<hr />";
    }
  }
  element.firstChild.nextSibling.innerHTML = html;
  Utils.check();
};

Utils.on(document, "click", ".changeButton", function () {
  var s1 = this.getAttribute("data-for1");
  var s2 = this.getAttribute("data-for2");

  var t1 = MatrixTables.get(s1).getElements();
  var t2 = MatrixTables.get(s2).getElements();
  var r1 = MatrixTables.get(s1).rows;
  var c1 = MatrixTables.get(s1).cols;

  MatrixTables.get(s1).SetShow(MatrixTables.get(s2).rows, MatrixTables.get(s2).cols);
  MatrixTables.get(s2).SetShow(r1, c1);
  
  MatrixTables.get(s1).insert(t2);
  MatrixTables.get(s2).insert(t1);
});

// ---------------------------------------- cookies -----------------------------------------------



Utils.on(document, "click", ".clearTable", function (event) {
  var s = this.getAttribute("data-for");
  var mt = MatrixTables.get(s);
  mt.clearTable();
});

Utils.on(document, "click", ".resizeTable", function (event) {
  var s = this.getAttribute("data-for");
  var inc = this.getAttribute("data-inc");
  var n = Number(inc);
  var mt = MatrixTables.get(s);
  mt.SetShow(mt.rows + n, mt.cols + n);
});

Utils.on(document, "click", ".findEVectors", handleError(function (event) {
  var s = this.getAttribute("data-for");
  findEVectors(MatrixTables.get(s).getMatrix());
}));

Utils.on(document, "click", ".example0", handleError(function (event) {
//super hack
  event.preventDefault();
  var s = this.nextElementSibling.nextElementSibling.textContent;
  if (MatrixTables.get("a").mode === "cells") {
    document.querySelector("button.swapMode").click();
  }
  MatrixTables.get("a").textarea.value = s;
}));

Utils.on(document, "click", ".gaus", handleError(function (event) {
  var args = (this.getAttribute("data-args") || "").split(",");
  solveByGauss(args[0], +args[1], +args[2], +args[3], false);
}));

Utils.on(document, "click", ".inverse", handleError(function (event) {
  var s = this.getAttribute("data-for");
  inverse(MatrixTables.get(s).getMatrix());
}));

Utils.on(document, "click", ".testSLECompatibility", handleError(function (event) {
  var s = this.getAttribute("data-for");
  testSLECompatibility(MatrixTables.get(s).getMatrix());
}));

Utils.on(document, "click", ".solveUsingCramersRule", handleError(function (event) {
  var s = this.getAttribute("data-for");

  // TODO: fix
  var variableNames = MatrixTables.get(s).lastVariableNames || {
    get: function (i) {
      return "x<sub>" + (i + 1) + "</sub>";
    }  
  };//!hack

  solveUsingCramersRule(MatrixTables.get(s).getMatrix(), variableNames);
}));

var appendScript = function (src) {
  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = src;
  var s = document.querySelector("script");
  s.parentNode.insertBefore(script, s);
};

global.appendScript = appendScript;//TODO: remove

Utils.initialize(".showComments", function (element) {
  var showComments = function () {
    if (window._hcwp) {
      return;
    }
    element.style.display = "none";
    document.querySelector(".hc-link").classList.remove("display-none");
    window._hcwp = window._hcwp || [];
    _hcwp.push({widget:"Stream", widget_id:8317});
    var lang = document.documentElement.lang.slice(0, 2);
    window.HC_LOAD_INIT = true;
    var src = ("https:" == document.location.protocol ? "https" : "http")+"://w.hypercomments.com/widget/hc/8317/"+lang+"/widget.js";
    appendScript(src);
  };

  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  var checkHash = function (e) {
    if (!isMobile || location.hash.indexOf("hcm") !== -1 || location.hash.indexOf("hypercomments_widget") !== -1) {
      showComments();
    }
  };
  checkHash(null);
  window.addEventListener("hashchange", checkHash, false);
});
Utils.initialize(".twitter-share-button", function (element) {
  element.href += "&text=" + encodeURIComponent(document.title);
});

// detfindDet

Utils.initialize(".insertTable", function (c) {
//!TODO: remove
  document.body.classList.add("math");

  var id = c.getAttribute("data-id");
  var sizes = c.getAttribute("data-sizes") || "";
  var sz = [3, 3];
  if ((/^\d+x\d+$/).test(sizes)) {
    sz = sizes.split("x");
  }
  var mode = c.getAttribute("data-mode") || "";
  var x = new MatrixTable(id, sz[0], sz[1], mode === "P" ? 3 : (mode === "X" ? 1 : 0), c);
});

Utils.initialize(".expression", function (element) {
  if (element.getAttribute("data-expression") === null) {
    element.previousElementSibling.disabled = true;
    keyStorage.getItem("expression", "", function (z) {
      element.previousElementSibling.disabled = false;
      if (z !== "") {
        element.previousElementSibling.value = z;
      }
    });
  }
});

var fixIE8 = function () {
  if ("\v" === "v" && window.html5) {
    window.html5.elements = "mo mi mn msup msub msqrt mrow mfrac mfenced mtable mtr mtd";
    window.html5.shivDocument(document);
  }
};

Utils.initialize("BODY", function () {
 fixIE8();
});

Utils.initialize(".fromCookie", function () {
  var cget = null;
  try {
    var storage = window.localStorage;
    if (storage) {
      cget = storage.getItem('resdiv');
    }
  } catch (e) {
    handleStorageError(e, -1);
  }
  try {
    // old data ?
    cget = cget ? JSON.parse(cget) : null;  
  } catch (e) {
    setTimeout(function () {
      throw e;
    }, 0);
  }
  var needsExample = true;
  if ((cget instanceof Array) && cget.length) {
    var i = -1;
    while (++i < cget.length) {
      zInsAct(cget[i][0], cget[i][1], true, cget[i].length > 2 ? cget[i][2] : null);
      needsExample = false;
    }
  }
  var hash = String(location.hash).slice(1);
  //TODO: FIX!!!
  try {
    var s = hash;
    var x = RPN(hash, {
      get: function (id) {
        return undefined;
      },
      //TODO: fix
      callback: function (e) {
        s = e;
      }
    });
    var ss = printSomething(s, {toMathML: true, useMatrixContainer: true}) + "<mo>=</mo>" + printSomething(x, {toMathML: true, useMatrixContainer: true});
    if (!(cget instanceof Array) || cget.length === 0 || cget[cget.length - 1][0] !== ss) {
      zInsAct(ss, x instanceof Matrix ? x : (x instanceof Expression.Matrix ? x.matrix : ""), false, null);
      needsExample = false;
    }
  } catch (e) {
    if (e instanceof UserError) {
      //ignore
    } else {
      throw e;
    }
  }
  if (needsExample) {
    var m1 = Matrix.Random(3, 3);
    var m2 = Matrix.Random(3, 3);
    var mm = m1.multiply(m2);
    zInsAct(zInsTable(m1) + zInsTable(m2) + "<mo>=</mo>" + zInsTable(mm), mm, false, null);
  }
});

// --------------------------------------------- end ----------------------------------------------

// ---------------------------------------- determinant -----------------------------------------------

function zInsMatX(X) { //! column X = () - array of strings
  //TODO: fix!?
  return zInsTable(X, 0);
}

function Myelem(m, a, z) {
  this.m = m;
  this.a = a;// Fraction
  this.z = z;// number
}

function getDeterminant(m, k, r, z, koef) {
  if (m.cols() === 1) {
    return m.e(0, 0);
  }
  
  var i = 0,
    o = RPN("0"),
    mx, kk;
    
  function complement(elem, r, c) {
      return m.e(r >= i ? r + 1 : r , c >= k ? c + 1 : c );
  }

  for (i = 0; i < m.cols(); i++) {

    // complement matrix for element e(i, k)
    mx = Matrix.Zero(m.rows() - 1, m.cols() - 1).map(complement);

    kk = koef.multiply(m.e(i, k));
    if (Math.floor((i + k) / 2) * 2 !== i + k) {
      kk = kk.negate();
    }
    r.push(new Myelem(mx, kk, z));
    o = o.add(m.e(i, k).multiply(getDeterminant(mx, 0, r, z + 1, kk)));
  }
  return o;
}
//TODO: merge with printSomething ?
function mprintA(r) {
  var i, j, z = r[0].m.cols() - 1,
      si = -1, mstr = '';
  for (i = 0; i < z; i++) {
    for (j = 0; j < r.length; j++) {
      if (r[j].z === i && !r[j].a.equals(RPN("0"))) {
        var xxx = printSomething(r[j].a, {toMathML: false});
        mstr += "+" + xxx + zInsTable(r[j].m, 2);
      }
    }
    mstr += '=';
    si = -1;
    //m = 1;?
  }
  return mstr;
}

function detfindDet(m, b, num) {
    var r = [];
    var k = parseInt(num, 10) - 1;

    //!
    if (!m.isSquare()) {
      alert(i18n.matrixIsNotSquare);
      return;
    }
    if (isNaN(k) || k >= m.rows() || k < 0) { // m.isSquare() === true
      alert(i18n.inputError);//?
      return;//!
    }
    //!
    
    r.push(new Myelem(m, RPN("1"), 0));
    if (b) {
      // expansion by row k
      m = m.transpose();
      getDeterminant(m, k, r, 1, RPN("1"));
      var i = -1;
      while (++i < r.length) {
        r[i].m = r[i].m.transpose();
      }
      
    } else {
      getDeterminant(m, k, r, 1, RPN("1"));// expansion by column k
    }
    var html = mprintA(r) + m.determinant();
    document.getElementById('resdiv').innerHTML = html;
    Utils.check();
}

Utils.on(document, "click", ".detfindDet", handleError(function () {
  var byRow = this.getAttribute("data-by-row") === "true";
  detfindDet(MatrixTables.get("a").getMatrix(), byRow, document.getElementById(byRow ? 'rNumb' : 'cNumb').value);
}));

Utils.on(document, "click", ".getZero", handleError(function () {
  var atRow = this.getAttribute("data-at-row") === "true";
  getZero(MatrixTables.get("a").getMatrix(), atRow ? 1 : 0, document.getElementById(atRow ? 'rNumb2' : 'cNumb2').value);
}));


function mgetZero(m, k) { // m == n ; in a column k -- find in k-column non-zero element and ... subtract
    var i, j, r = [];

    function f1(elem, row, col) {
      return (row !== j ? elem : m.e(row, col).subtract(m.e(i, col).multiply(m.e(row, k)).divide(m.e(i, k))));
    }
    
    for (i = 0; i < m.rows(); i++) {
      if (!m.e(i, k).equals(RPN("0"))) {
        break;
      }
    }
    if (i === m.rows()) {
      return r;// r?
    }
    for (j = 0; j < m.rows(); j++)  {
      if (j !== i) {
        m = m.map(f1);
        r.push(m);
      }
    }
    return r;
}

function getZero(m, b, a) { // b - by row
    var dets = null;
    var k = parseInt(a, 10) - 1;
    //!
    if (!m.isSquare()) {
      alert(i18n.matrixIsNotSquare);
      return;
    }
    if (isNaN(k) || k >= m.rows() || k < 0) { // m.isSquare() === true
      alert(i18n.inputError);//?
      return;//!
    }
    //!

    var html = zInsTable(m, 2) + '=';

    dets = mgetZero(b ? m.transpose() : m, k);
   
    var i = -1;
    while (++i < dets.length) {
      html += (i === 0 ? "" : "=") + zInsTable(b ? dets[i].transpose() : dets[i], 2);
    }
    html += "=";
    
    html += m.determinant();
    document.getElementById('resdiv').innerHTML = html;
    Utils.check();
}
// --------------------------------------------- end ----------------------------------------------
// ---------------------------------------- sle -----------------------------------------------

Matrix.trimRight = function (x) {
  var ZERO = RPN("0");
  var lastColumn = 0;
  x.map(function (e, i, j) {
    if (lastColumn < j && !e.equals(ZERO)) {
      lastColumn = j;
    }
    return e;
  });
  return x.slice(0, x.rows(), 0, lastColumn + 1);
};

function testSLECompatibility(fullMatrix) {
  var st = '<h4>' + i18n.textAnalyseCompatibility + '</h4>',
      m = Matrix.trimRight(fullMatrix.slice(0, fullMatrix.rows(), 0, fullMatrix.cols() - 1)),
      b = fullMatrix.slice(0, fullMatrix.rows(), fullMatrix.cols() - 1, fullMatrix.cols()),
      ex, f1, f2;
  //! TODO: remove ?
  //if (b.cols() !== 1 || b.rows() !== m.rows()) {
  //  alert(i18n.text03);
  //  return;
  //}
  ex = m.augment(b);
  f1 = m.rank();
  f2 = ex.rank();
  st += ' rank' + zInsTable(m) + '=' + f1;
  st += '<br /> rank' + zInsTable(ex) + '=' + f2;
  if (f1 === f2) {
    if (m.cols() === f1) {
      st += '<br />' + i18n.textAn1a;
    } else {
      st += '<br />' + i18n.textAn1b;
    }
  } else {
    st += '<br />' + i18n.textAn2;
  }
  document.getElementById('resdiv').innerHTML = st;
  Utils.check();
}

  //TODO: move
  var outSystem = function (matrix, variableNames) {
    return printSomething(matrix, {
      toMathML: true,
      variableNames: variableNames,
      insLambda: false,
      useBraces: ["{", " "],
      useMatrixContainer: true,
      columnlines: false
    });
  };
  //! TODO: (!)

function solveUsingCramersRule(fullMatrix, variableNames) {
  var m = Matrix.trimRight(fullMatrix.slice(0, fullMatrix.rows(), 0, fullMatrix.cols() - 1));
  var b = fullMatrix.slice(0, fullMatrix.rows(), fullMatrix.cols() - 1, fullMatrix.cols());

  var D0, m1, d = [], i, mstr;
  if (!m.isSquare()) {
    alert(i18n.text01);
    return;
  }
  D0 = m.determinant();
  if (D0.equals(RPN("0"))) {
    alert(i18n.text02);
    return;
  }
  //if (b.cols() !== 1 || b.rows() !== m.rows()) {
  //  alert(i18n.text03);
  //  return;
  //}
  mstr = '<center>' + i18n.text04 + '</center>';
  mstr += outSystem(fullMatrix, variableNames) + "<br />";
  mstr += '&Delta; = ' + zInsTable(m, 2) + ' = ' + D0 + '<br />';

  
  function detMatrixI(elem, row, col) {
    return col === i ? b.e(row, 0) : elem;
  }
  
  for (i = 0; i < m.cols(); i++) {
  
    m1 = m.map(detMatrixI);
    d[i] = m1.determinant();
    mstr += '&Delta;<sub>' + (i + 1) + '</sub> = ' + zInsTable(m1, 2) + ' = ' + d[i] + '; ';
  }
  mstr += '<br />';
  for (i = 0; i < m.cols(); i++) {
    mstr += variableNames.get(i) + ' = &Delta;<sub>' + (i + 1) + '</sub>/&Delta; = ' + d[i].divide(D0) + '<br />';
  }

  mstr += i18n.textAnswer + '<br />';
  for (i = 0; i < m.cols(); i++) {
    mstr += variableNames.get(i) + ' = ' + d[i].divide(D0) + '<br />';
  }
  document.getElementById('resdiv').innerHTML = mstr;
  Utils.check();
}

// SLE solution with inverse matrix
function inverse(fullMatrix) {
  var m = Matrix.trimRight(fullMatrix.slice(0, fullMatrix.rows(), 0, fullMatrix.cols() - 1));
  var b = fullMatrix.slice(0, fullMatrix.rows(), fullMatrix.cols() - 1, fullMatrix.cols());

    var mstr = "";
    var c = null;
    if (!m.isSquare()) {
        alert(i18n.text05);
        return;
    }
    //if (m.isSingular()) {
    //    alert(i18n.text06);
    //    return;
    //}
    //if (b.cols() !== 1 || b.rows() !== m.rows()) {
    //    alert(i18n.text03);
    //    return;
    //}
    try {
      c = m.inverse();
    } catch (e) {
      if (e instanceof SingularMatrixException) {
        alert(i18n.text06);
      } else {
        throw e;
      }
    }
    mstr = '<center>' + i18n.text08 + '</center>A = ' + zInsTable(m) + '<br />B = ' + zInsTable(b) + '<br />A<sup>-1</sup> = ';
    mstr += zInsTable(c) + '<br />X = A<sup>-1</sup>*B = ' + zInsTable(c) + zInsTable(b) + ' = ' + zInsTable(c.multiply(b));
    document.getElementById('resdiv').innerHTML = mstr;
    Utils.check();
}

//----------Gauss
// notexp == 1 => reduce matrix to triangular form, it is not an extended matrix of the system

function matrix_getTriagMatr1(matr, GAUSS, notexp) { // up to m.n-1
  var m = matr.map(function (elem) { return elem; }),
      i, j, k,
      lb = 0,
      koef,
      result = [], wasAct;
  // if notexp, then pass including last column  

  result.push(m);
  
  // j = j + ...
  function func1(elem, row, col) {
    return (row !== j ? elem : elem.subtract(m.e(lb, col).multiply(koef)));
  }

  function func2(elem, row, col) {
    return (row === k ? m.e(lb, col) : (row === lb ? m.e(k, col) : elem));
  }

  function divideFunc(elem, row, col) {
    return row !== lb ? elem : elem.divide(m.e(lb, i));
  }

  for (i = 0; i < m.cols() + (notexp ? 0 : -1); i++) {
    if (lb >= m.rows()) {
      return result;
    }
    k = lb;
    while (k !== m.rows() && m.e(k, i).equals(RPN("0"))) { // searching for a non-zero element in i-th column
      k++;
    }
    if (k === m.rows()) {
      continue;
    }

    if (k !== lb) { // rows swapping
      
      m = m.map(func2);
      k = lb;

      result.push(m);
    }

    // At first, lets divide full row on m.a[lb][i] to get 1, if it is not 1
    wasAct = false;//?
    if (!m.e(lb, i).equals(RPN("1"))) {

      m = m.map(divideFunc);
      wasAct = true;//?

      if (GAUSS === 1) {
        wasAct = false;//?
        result.push(m);
      }
    }

    //wasAct = false;
    for (j = (GAUSS === 1 ? lb + 1 : 0); j < m.rows(); j++) { //getting zeros under the main diagonal; starting form 0 to make zeros in all non-diagonal elements
      if (j !== lb) {
        koef = m.e(j ,i); // because coefficient = 1   m.e(lb, i).equals(RPN("1"))
        m = m.map(func1);// zeros are added at the beginning ...
        wasAct = true;
      }
    }

    lb++;
    if (wasAct) {
      result.push(m);
    }
  }

  return result;
}

function countOfLeadingZeros(matrix, rowIndex) {
  var i = -1;
  while (++i < matrix.cols()) {
    if (!matrix.e(rowIndex, i).equals(RPN("0"))) {
      break;
    }
  }
  return i;
}

function solveByGauss(s, m_m, moreText, GAUSS, getvector) {
  var vecs, m, b, OSLU = 1, i, j, a, bx, tx, x, oi, p, f1, f2, c, mstr = '', ms;

  var variableNames = {
    get: function (i) {
      return "x<sub>" + (i + 1) + "</sub>";
    }
  };

  if (typeof s === "string") {
    moreText = 1;
    vecs = 0;
    var fullMatrix = MatrixTables.get(s).getMatrix();
    m = Matrix.trimRight(fullMatrix.slice(0, fullMatrix.rows(), 0, fullMatrix.cols() - 1));
    b = fullMatrix.slice(0, fullMatrix.rows(), fullMatrix.cols() - 1, fullMatrix.cols());

    variableNames = MatrixTables.get(s).lastVariableNames || variableNames;//!hack
  } else {
    // for eigenvectors
    vecs = 1;
    m = m_m.map(function(elem){ return elem; });
    b = Matrix.Zero(m.rows(), 1);
  }

  //! diapedesis zeros !!!
  b = Matrix.Zero(m.rows(), 1).map(function(elem, row, col) {
    return row < b.rows() && col < b.cols() ? b.e(row, col) : 0;
  });
  //further checking is not needed!?
  

  //if (b.cols() !== 1) {
  //  alert(i18n.text50);
  //  return;
  //}

  for (i = 0; i < b.rows() && OSLU === 1; i++) {
    if (!b.e(i, 0).equals(RPN("0"))) {
      OSLU = 0;
    }
  }

  a = m.augment(b);
  mstr = '';
  if (moreText) {
    mstr += '<h4>' + i18n.text51 + '</h4>';
  }

  var k = -1;
  if (GAUSS === 1) {
    ms = matrix_getTriagMatr1(a, 1, 0); // getting triangular without columns swapping

    k = -1;
    while (++k < ms.length) {
      mstr += (k !== 0 ? "&tilde;" : "") + zInsTable(ms[k], 1);
    }

    ms = matrix_getTriagMatr1(a, 0, 0); // getting triangular without columns swapping
  } else {
    ms = matrix_getTriagMatr1(a, 0, 0); // getting triangular without columns swapping
    k = -1;
    while (++k < ms.length) {
      mstr += (k !== 0 ? "&tilde;" : "") + zInsTable(ms[k], 1);
    }
  }

  m = ms[ms.length - 1];
  
  // 1. Throwing of null strings - they will be below, but checking: if we find a zero, which at the end has a non-zero, then there are no solutions!;
  c = 0;
  f1 = m.rows();
  f2 = 0;

  for (i = 0; i < m.rows(); i++) {
    c = countOfLeadingZeros(m, i);
    if (c === m.cols()) {
      f1 = i + 1;
    }
    if (c === m.cols() - 1) {
      f2 = 1;
    }
  }

  if (f2) {
    mstr += "<br />" + i18n.text52;
  } else {
    //  f1 - the number of non-zero rows

    x = []; // ((1/4,1,4,-2,...), ()) // 1/4+c1+c2-2c3
    for (i = 0; i < m.cols(); i++) {
      x[i] = '';
    }
    for (i = 0; i < f1; i++) {
      x[countOfLeadingZeros(m, i)] = new Polynom(RPN("0")); //first not zero in a row - 1 - main variable
    }
    oi = 1;
    for (i = 0; i < m.cols() - 1; i++) {
      if (typeof(x[i]) === "string") {
        x[i] = new Polynom(RPN("1"));
        x[i] = x[i].shift(oi); // "c"+ oi; //define free as c1,c2,c3...
        oi++;
      }
    }

    for (i = 0; i < f1; i++) {
      c = countOfLeadingZeros(m, i);
      x[c] = x[c].add(new Polynom(m.e(i, m.cols() - 1)));
      for (j = c + 1; j < m.cols() - 1; j++) {
        x[c] = x[c].add((new Polynom(m.e(i, j).negate())).multiply(x[j]));
      }
    }

    tx = [];
    for (i = 0; i < m.cols() - 1; i++) {
      tx[i] = printSomething(x[i], {toMathML: true, useMatrixContainer: true, svar: "c", hack0: true});
    }

    if (moreText) {
      mstr += '<br />' + i18n.textAnswer + '<br />';
      for (i = 0; i < m.cols() - 1; i++) {
        mstr += variableNames.get(i) + "=" + tx[i] + ";";
      }
    }
    mstr += '<br />' + (moreText ? i18n.text53 : '') + ' X=' + zInsMatX(tx);

    oi--;
    if ((moreText || getvector) && OSLU === 1 && oi > 0) {
      mstr += '<br />' + i18n.textBasicSolutions + ': ';
      for (i = 0; i < oi; i++) {
        bx = [];
        for (j = 0; j < m.cols() - 1; j++) {
          if (x[j].a[i + 1]) {
            bx[j] = x[j].a[i + 1];
          } else {
            bx[j] = RPN("0");
          }
        }
        mstr += '&lambda;<sub>' + i + '</sub>' + zInsMatX(bx) + ' ; ';
      }
      mstr += '<br />' + i18n.textFundamentalSystem + ': ';
      var vectors = [];
      for (i = 0; i < oi; i++) {
        bx = [];
        for (j = 0; j < m.cols() - 1; j++) {
          if (x[j].a[i + 1]) {
            bx[j] = x[j].a[i + 1];
          } else {
            bx[j] = RPN("0");
          }
        }
        if (getvector) {
          vectors.push(new Matrix([bx]).transpose());
        }
        mstr += zInsMatX(bx) + (i !== oi - 1 ? ' , ' : '');
      }
      if (getvector) {
        return vectors;
      }
    }

  }

  if (vecs) {
    //!
    p = 1;
    for (i = 0; i < m.cols() - 1; i++) {
      if (tx[i] !== "0") {
        p = 0;
        break;
      }
    }
    if (p) { // all zeros - lambda was incorrect, and the root is irrational
      alert("error!!!");
    } else {
      return mstr;
    }
  } else {
    document.getElementById('resdiv').innerHTML = mstr;
    Utils.check();
  }
}


// -------------------------------------------- vectors -------------------------------------------
function permutations(n, callback) {
  n = Math.floor(n);
  if (n < 1) {
    return;
  }
  var p = [];
  var even = true;
  var i = -1;
  while (++i < n) {
    p[i] = i;
  }
  var k = 0;
  var l = 0;
  var t = 0;

  while (true) {
    callback(p, even);
    k = n - 2;
    l = n - 1;

    while (k >= 0 && p[k] > p[k + 1]) {
      --k;
    }

    if (k < 0) {
      return;
    }

    while (p[k] > p[l]) {
      --l;
    }

    t = p[k];
    p[k] = p[l];
    p[l] = t;
    even = !even;

    // reverse
    i = k + 1;
    while (i < n - i + k) {
      t = p[n - i + k];
      p[n - i + k] = p[i];
      p[i] = t;
      even = !even;
      ++i;
    }
  }
}

function getpl(m) {
  if (!m.isSquare()) {
    return null;
  }
  // TODO: remove Polynom
  var determinant = new Polynom(RPN("0"));
  permutations(m.cols(), function (p, even) {
    var t = new Polynom(even ? RPN("1") : RPN("-1"));
    var i = -1;
    while (++i < p.length) {
      if (i === p[i]) {
        t = t.multiply(new Polynom(m.e(i, p[i]), RPN("-1")));
      } else {
        t = t.multiply(new Polynom(m.e(i, p[i])));
      }
    }
    determinant = determinant.add(t);
  });
  return determinant;
}

function getOwnNumbers(matrix) {
  var p = getpl(matrix);
  var roots = p.getroots();
  // removing of duplicates
  var i = -1;
  var results = [];
  var resultsWithoutDuplicates = [];
  while (++i < roots.length) {
    var isDuplicate = false;
    var j = -1;
    var root = roots[i];
    while (++j < resultsWithoutDuplicates.length) {
      if (resultsWithoutDuplicates[j].equals(root)) {
        isDuplicate = true;
      }
    }
    if (!isDuplicate) {
      resultsWithoutDuplicates.push(root);
    }
    results.push(root);
  }
  return [resultsWithoutDuplicates, results];
}

function findEVectors(m) {
  var p, f, mm, mstr, i;
  
  if (!m.isSquare()) {
    alert(i18n.matrixIsNotSquare);
    return;
  }

  p = getpl(m);
  f = getOwnNumbers(m)[0];

  mstr = i18n.text11 + '<center>' + zInsTable(m, 2, true) + ' = ' + printSomething(p, {toMathML: true, useMatrixContainer: true, svar: '&lambda;'}) + '<br /></center>';
  for (i = 0; i < f.length; i++) {
    mstr += '&lambda;<sub>' + (i + 1) + '</sub> = ' + f[i] + '<br />';
  }
  if (f.length > 0) {
    mstr += i18n.text13;
    mstr += "<br />";
  } else {
    mstr += i18n.text14;
  }
  for (i = 0; i < f.length; i++) {
    mm = m.subtract(Matrix.I(m.cols()).scale(f[i]));
    mstr += '&lambda;<sub>' + (i + 1) + '</sub> = ' + f[i] + '<br />A-&lambda;E = ' + zInsTable(mm, 2) + '<br />(A-&lambda;E)X = 0, ' + i18n.text12 + '<br />' + solveByGauss(0, mm, 0, 0, false) + '<br />';
  }
  document.getElementById('resdiv').innerHTML = mstr;
  Utils.check();
}
// --------------------------------------------- end ----------------------------------------------




// A = T^-1 L T ,T-matrix of own vectors, L - matrix of own values

function diagonalize(m) {
  var L, T, mm, v;
  if (!m.isSquare()) {
    alert(i18n.matrixIsNotSquare);
    return 0; //!
  }

  var tmp = getOwnNumbers(m);
  var eigenValuesWithoutDuplicates = tmp[0];
  var eigenValues = tmp[1];
  /*
  if (m.cols() !== eigenValues.length) {
    alert(i18n.notEnoughRationalEigenvalues);
    return 0; //!
  }
  */
  var eigenVectors = [];
  var i = -1;
  while (++i < eigenValues.length) {
    mm = m.subtract(Matrix.I(m.cols()).scale(eigenValues[i])); // m - E*eigenValues[i]
    var array = solveByGauss(0, mm, 0, 0, true);
    var j = -1;
    while (++j < array.length) {
      eigenVectors.push(array[j]);
    }
  }
  if (eigenVectors.length < m.cols()) {
    alert(i18n.notEnoughRationalEigenvalues);//!!! TODO: fix message
    return 0;
  }

  L = Matrix.Diagonal(eigenValues);
  T = Matrix.I(m.cols());


  var k = -1;
  while (++k < T.cols()) {
    v = eigenVectors[k];
    var l = -1;
    while (++l < T.cols()) {
      T.a[l][k] = v.e(l, 0);
    }
  }

  zInsAct(zInsTable(m) + ' = ' + zInsTable(T) + zInsTable(L) + zInsTable(T.inverse()), T, false, null);
}

// --------------------------------------------- end ----------------------------------------------

function fordecfract() {
  var usedecfrac = document.getElementById("decfraccheckbox").checked;
  var frdigits = Number(document.getElementById("frdigits").value) || 0;
  decFract = (usedecfrac ? frdigits : -1);
  if (usedecfrac) {
    document.getElementById("frdigitsspan").classList.remove("display-none");
  } else {
    document.getElementById("frdigitsspan").classList.add("display-none");
  }
}
// 1286


Utils.on(document, "click", ".mroots", function () {
  var polyfromtable = function (stable) {
    var m = new Matrix(stable);
    var st = m.a[0].reverse();
    //var st = m.tostr(',',1);
    // TODO: move
    var F = function () {};
    F.prototype = Polynom.prototype;
    var p = new F();
    Polynom.apply(p, st);
    return p;
  };
  var p1 = polyfromtable('a');
  var p2 = polyfromtable('b');
  var a = p1.getroots();
  alert("Roots: "+ a);
});

  // TODO: fix?
  global.printSomething = printSomething;
  global.mgetZero = mgetZero;
  global.permutations = permutations;

}(this));

function drawElement(element) {

  // main drawing function - recursive call
  function draw(parentBoundingRect, element, context) {
    var computedStyle = getComputedStyle(element, null);
    var boundingRect = element.getBoundingClientRect();

    context.save();

    context.translate(boundingRect.left - parentBoundingRect.left,
                      boundingRect.top - parentBoundingRect.top);
    var w = boundingRect.right - boundingRect.left;
    var h = boundingRect.bottom - boundingRect.top;

    // border
    context.save();
    var drawBorder = function (side) {
      context.beginPath();
      var br = Math.max(parseFloat(computedStyle.borderTopLeftRadius), parseFloat(computedStyle.borderTopRightRadius));
      var cssWidth = "0px";
      var color = "transparent";
      if (side === "top") {
        cssWidth = computedStyle.borderTopWidth;
        color = computedStyle.borderTopColor;
      } else if (side === "right") {
        cssWidth = computedStyle.borderRightWidth;
        color = computedStyle.borderRightColor;
      } else if (side === "bottom") {
        cssWidth = computedStyle.borderBottomWidth;
        color = computedStyle.borderBottomColor;
      } else if (side === "left") {
        cssWidth = computedStyle.borderLeftWidth;
        color = computedStyle.borderLeftColor;
      }
      var lineWidth = parseFloat(cssWidth);
      if (lineWidth !== 0) {
        context.lineWidth = lineWidth;
        context.strokeStyle = color;
        if (!br && (side === "top" || side === "bottom")) {
          context.moveTo(0, 0 + lineWidth / 2);
          context.lineTo(w, 0 + lineWidth / 2);
        }
        if (side === "right" || side === "left") {
          context.moveTo(w - lineWidth / 2 - br, 0);
          context.quadraticCurveTo(w - lineWidth / 2, 0, w - lineWidth / 2, br);
          context.lineTo(w - lineWidth / 2, h - br);
          context.quadraticCurveTo(w - lineWidth / 2, h, w - lineWidth / 2 - br, h);
        }
        context.stroke();
      }
    };
    drawBorder("top");
    drawBorder("right");
    context.translate(+w / 2, +h / 2);
    context.rotate(-Math.PI);
    context.translate(-w / 2, -h / 2);
    drawBorder("bottom");
    drawBorder("left");
    context.restore();

    var childNode = element.firstChild;
    while (childNode !== null) {
      var nodeType = childNode.nodeType;
      if (nodeType === 1) {
        draw(boundingRect, childNode, context);
      }
      if (nodeType === 3) {
        // text childs:
        var range = childNode.ownerDocument.createRange();
        context.fillStyle = computedStyle.color;
        context.textBaseline = "top";
        context.font = computedStyle.font;

        var childNodeData = childNode.data;
        var l = childNodeData.length;
        var j = -1;
        while (++j < l) {
          range.setStart(childNode, j);
          range.setEnd(childNode, j + 1);
          var r = range.getClientRects();
          if (r.length !== 0) {
            context.fillText(childNodeData[j], r[0].left - boundingRect.left, r[0].top - boundingRect.top);
          }
        }
      }
      childNode = childNode.nextSibling;
    }

    context.restore();
  }

  var canvas = document.createElement("canvas");
  var boundingRect = element.getBoundingClientRect();
  canvas.width = Math.floor(boundingRect.right - boundingRect.left + 0.5);
  canvas.height = Math.floor(boundingRect.bottom - boundingRect.top + 0.5);
  var context = canvas.getContext("2d");
  context.fillStyle = "transparent";
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
  draw(boundingRect, element, context);
  return canvas.toDataURL();
}

// loading indicator in Opera
if (window.matchMedia && !window.opera) {
  var mediaQueryList = window.matchMedia("screen and (max-width: 800px)");  // see style.css
  var checkMedia = function (mediaQueryList) {
    if (!mediaQueryList.matches) {
      mediaQueryList.removeListener(checkMedia);

      Utils.initialize(".adsbygoogle", function (element) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        appendScript("../pagead2.googlesyndication.com/pagead/js/f.txt");
      });
    }
  };
  mediaQueryList.addListener(checkMedia);
  checkMedia(mediaQueryList);
}

Utils.initialize(".g-plusone", function () {
  window.___gcfg = {lang: document.documentElement.lang};
  appendScript("../apis.google.com/js/plusone.js");
});


//! HACK

(function () {
  var fixMathMLFlag = false;
  Utils.initialize("MSUP", function () {
    if (fixMathMLFlag) {
      return;
    }
    fixMathMLFlag = true;
    (window.requestAnimationFrame || setTimeout)(function () {
      fixMathMLFlag = false;
      var elements = document.querySelectorAll("MSUP");
      var q = new Array(elements.length);
      var i = -1;
      while (++i < elements.length) {
        var element = elements[i];
        var base = element.firstElementChild;
        var superscript = base.nextElementSibling;
        var h1 = superscript.offsetHeight;
        q[i] = -4.2;
        if (base.style !== null) {
          q[i] = h1 / 2;
        }
      }
      i = -1;
      while (++i < elements.length) {
        if (q[i] !== -4.2) {
          elements[i].firstElementChild.style.marginTop = q[i].toFixed(3) + "px";
        }
      }
    }, 8);
  });
}());

/*

    html2html(document.body, function (s) {
        var dataURL = "data:text/html;base64," + window.btoa(s);
    });

*/

(function (global) {
  "use strict";

  var escapeHTML = function (s) {
    return String(s).replace(/&/g, "&amp;")
                    .replace(/</g, "&lt;")
                    .replace(/>/g, "&gt;")
                    .replace(/"/g, "&#34;")
                    .replace(/'/g, "&#39;");
  };

  var html2html = function (container, callback, buffer) {
    buffer = buffer || [];
    var tagName = container.tagName;
    if (tagName === "LINK" && container.getAttribute("rel") === "stylesheet") {
      var href = container.href;
      buffer.push("<link href=\"" + escapeHTML(href) + "\" rel=\"stylesheet\" type=\"text/css\"/>");
    } else if (tagName !== "SCRIPT" && tagName !== "IFRAME") {
      buffer.push("<");
      buffer.push(tagName);
      if (tagName === "INPUT" && container.value !== "") {
        buffer.push(" value=\"");
        buffer.push(container.value);
        buffer.push("\"");
      }
      var attributes = container.attributes;
      var length = attributes.length;
      var i = -1;
      while (++i < length) {
        var a = attributes[i];
        buffer.push(" ");
        buffer.push(escapeHTML(a.name));
        buffer.push("=");
        buffer.push("\"");
        buffer.push(escapeHTML(a.value));
        buffer.push("\"");
      }
      buffer.push(">");
      if (tagName === "TEXTAREA") {
        buffer.push(escapeHTML(container.value));
      } else {
        var child = container.firstChild;
        while (child !== null) {
          if (child.nodeType === 1) {
            html2html(child, null, buffer);
          } if (child.nodeType === 3) {
            buffer.push(child.nodeValue);
          }
          child = child.nextSibling;
        }
      }

      buffer.push("</");
      buffer.push(tagName);
      buffer.push(">");
    }
    if (callback !== null) {
      callback(buffer.join(""));
    }
  };

  global.html2html = html2html;
}(this));
