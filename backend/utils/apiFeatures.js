class APIFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    //announcement
    searchTitle() {
        const keyword = this.queryStr.keyword ? {
            title: {
                $regex: this.queryStr.keyword,
                $options: 'i' // i means case insensitive
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }

    //request
    searchRequests() {
        const keyword = this.queryStr.keyword ? {
            trackingNumber: {
                $regex: this.queryStr.keyword,
                $options: 'i' // i means case insensitive
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }

    //audit
    searchAudit() {
        const keyword = this.queryStr.name ? {
            name: {
                $regex: this.queryStr.name,
                $options: 'i' // i means case insensitive
            }
        } : this.queryStr.eventInfo ? {
            eventInfo: {
                $regex: this.queryStr.eventInfo,
                $options: 'i' // i means case insensitive
            }
        } :
            this.queryStr.user ? {
                user: {
                    $regex: this.queryStr.user,
                    $options: 'i' // i means case insensitive
                }
            } : {}

        this.query = this.query.find({ ...keyword })
        return this
    }

    //forms
    searchForms() {
        const keyword = this.queryStr.keyword ? {
            formName: {
                $regex: this.queryStr.keyword,
                $options: 'i' // i means case insensitive
            }
        } : {}
        this.query = this.query.find({ ...keyword })
        return this
    }

    //conversation
    searchUser() {
        const keyword = this.queryStr.keyword ? {
            names: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }

        // Removing fields from the query string
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el])

        // Advanced filter not yet applied

        this.query = this.query.find(queryCopy)
        return this
    }
    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)

        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

module.exports = APIFeatures