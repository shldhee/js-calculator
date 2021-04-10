
class Type {
  constructor(value, type) {
    this.value = value
    this.type = type
    this.expression = ''
    this.init()
  }
  init() {
    if(this.type === 'operation') {
      if(this.value === 'X') {
        this.expression = 'multiply'
      }
      if(this.value === '/') {
        this.expression = 'divide'
      }
      if(this.value === '+') {
        this.expression = 'plus'
      }
      if(this.value === '-') {
        this.expression = 'minus'
      }
    }
  }
}// @ts-nocheck
class Calculator {
  constructor() {
    this.digits = []
    this.totalExpression = []
    this.stringTotalExpression = ''
    this.result = '';
  }
  init() {
    document.querySelector('.calculator').addEventListener('click', (e) => {
      this.handleClick(e.target)
    })
  }
  handleClick(target) {
    const className = target.className
    const value = target.textContent
    const selector = new Type(value, className)

    if(selector.type === 'digit') {
      if(this.digits.length === 0) {
        if(selector.value == 0) return
      }
      if(this.digits.length >= 3) {
        alert('숫자는 세 자리까지만 입력 가능합니다!')
        return
      }
      this.digits.push(selector);
      this.totalExpression.push(selector)
    }
    if(selector.type === 'modifier') {
      this.digits = []
      this.totalExpression = []
      // refresh
    }
    if(selector.type === 'operation') {
      if(this.totalExpression.length === 0 || this.totalExpression[this.totalExpression.length-1].type === 'operation') {
        alert('숫자를 먼저 입력한 후 연산자를 입력해주세요!')
        return
      }
      this.digits = []

      if(selector.value === '=') {
        const index = this.totalExpression.findIndex(({type}) => type === 'operation')
        const firstNumber = this.stringTotalExpression.slice(0,index)
        const secondNumber = this.stringTotalExpression.slice(index+1)
        const result = this.calculate(this.totalExpression[index].expression, firstNumber, secondNumber)
        // 다시 결과값을 배열로 변경하고 type digit로 하고 totalExpression에 넣는다.
        this.totalExpression = result.split('').map((number) => ({
          value: number,
          type: 'digit'
        }))
        this.digits = this.totalExpression
        this.convertToStringTotalExpression()
        document.querySelector('#total').textContent = this.stringTotalExpression
        return
      }
      this.totalExpression.push(selector)
    }

    this.convertToStringTotalExpression()
    document.querySelector('#total').textContent = this.stringTotalExpression

  }
  run() {
    this.init();
  }
  convertToStringTotalExpression() {
    this.stringTotalExpression = this.totalExpression.length === 0 ? '0' : this.totalExpression.map(({value}) => value).join('')
  }
  calculate(expression, first, second) {
    const obj = {
      'plus': Number(first) + Number(second),
      'multiply': Number(first) * Number(second),
      'divide': Number(first) / Number(second),
      'minus': Number(first) - Number(second)
    }
    return String(Math.floor(obj[expression]))
  }
}

const calculator = new Calculator().run();

