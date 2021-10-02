import _ from 'lodash'

export default {
    deserialiseCategory (category: string) {
        let newString = this.startCase(category.replace('_', ' '))
        return newString
    },

    startCase (literal: string) {
        return _.startCase(literal)
    },

    isEmpty (item: any) {
        return _.isEmpty(item)
    }
}