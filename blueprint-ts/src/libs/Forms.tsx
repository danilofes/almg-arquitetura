
class Form<T extends { [name: string]: any }> {

  stringField<U>(f: StringField<U>): Form<T & U> {
    return new Form<T & U>();
  }

}

interface StringField<T> {
  getValue: (innerValue: string) => T
  setValue: (form: T) => string
}


let x = new Form<{}>()
  .stringField({
    getValue: s => ({ macaco: s }),
    setValue: ({ macaco }) => macaco
  })
  .stringField({
    getValue: s => ({ louco: s }),
    setValue: ({ louco }) => louco
  });

