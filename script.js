class Calculator {
    constructor(e, t) {
        (this.previousOperandTextElement = e), (this.currentOperandTextElement = t), (this.isEqualClicked = !1), this.clear();
    }
    clear() {
        (this.currentOperand = ""), (this.previousOperand = ""), (this.operation = void 0), (this.error = !1);
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(e) {
        ("." === e && this.currentOperand.includes(".")) || (this.currentOperand = this.currentOperand.toString() + e.toString());
    }
    chooseOperation(e) {
        "√" !== e
            ? "" !== this.currentOperand && ("" !== this.previousOperand && this.compute(), (this.operation = e), (this.previousOperand = this.currentOperand), (this.currentOperand = ""))
            : this.currentOperand >= 0
            ? (this.currentOperand = Math.sqrt(this.currentOperand))
            : ((this.currentOperandTextElement.innerText = "Error"), (this.error = !0));
    }
    compute() {
        let e;
        const t = parseFloat(this.previousOperand),
            r = parseFloat(this.currentOperand);
        if (isNaN(t) || isNaN(r)) return;
        const a = t.toString().slice(t.toString().indexOf(".") + 1).length,
            n = r.toString().slice(r.toString().indexOf(".") + 1).length;
        switch (this.operation) {
            case "+":
                e = a > n ? +(t + r).toFixed(a) : +(t + r).toFixed(n);
                break;
            case "-":
                e = a > n ? +(t - r).toFixed(a) : +(t - r).toFixed(n);
                break;
            case "*":
                e = a > n ? +(t * r).toFixed(a + 1) : +(t * r).toFixed(n + 1);
                break;
            case "÷":
                e = a > n ? +(t / r).toFixed(a + 1) : +(t / r).toFixed(n + 1);
                break;
            case "^":
                e = Math.pow(t, r);
                break;
            default:
                return;
        }
        (this.currentOperand = e), (this.operation = void 0), (this.previousOperand = "");
    }
    getDisplayNumber(e) {
        const t = e.toString(),
            r = parseFloat(t.split(".")[0]),
            a = t.split(".")[1];
        let n;
        return (n = isNaN(r) ? "" : r.toLocaleString("en", { maximumFractionDigits: 0 })), null != a ? `${n}.${a}` : n;
    }
    updateDisplay() {
        if (this.error && "Error" === this.currentOperandTextElement.innerText) return (this.error = !1), (this.currentOperand = ""), void (this.previousOperand = "");
        (this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)),
            null != this.operation ? (this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`) : (this.previousOperandTextElement.innerText = "");
    }
    lessOperand(e) {
        return "-" === e && "" === this.currentOperand && ((this.currentOperand = "-"), (this.currentOperandTextElement.innerText = this.currentOperand), !0);
    }
}
const numberButtons = document.querySelectorAll("[data-number]"),
    operationButtons = document.querySelectorAll("[data-operation]"),
    equalsButton = document.querySelector("[data-equals]"),
    deleteButton = document.querySelector("[data-delete]"),
    allClearButton = document.querySelector("[data-all-clear]"),
    previousOperandTextElement = document.querySelector("[data-previous-operand]"),
    currentOperandTextElement = document.querySelector("[data-current-operand]"),
    calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);
numberButtons.forEach((e) => {
    e.addEventListener("click", () => {
        calculator.isEqualClicked && calculator.clear(), calculator.appendNumber(e.innerText), calculator.updateDisplay(), (calculator.isEqualClicked = !1);
    });
}),
    operationButtons.forEach((e) => {
        e.addEventListener("click", () => {
            (calculator.isEqualClicked = !1), calculator.lessOperand(e.innerText) || (calculator.chooseOperation(e.innerText), calculator.updateDisplay());
        });
    }),
    equalsButton.addEventListener("click", (e) => {
        (calculator.isEqualClicked = !0), calculator.compute(), calculator.updateDisplay(), calculator.clear();
    }),
    allClearButton.addEventListener("click", (e) => {
        (calculator.isEqualClicked = !1), calculator.clear(), calculator.updateDisplay();
    }),
    deleteButton.addEventListener("click", (e) => {
        (calculator.isEqualClicked = !1), calculator.delete(), calculator.updateDisplay();
    });
