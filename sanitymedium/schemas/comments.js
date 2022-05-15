export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'approved',
            title: 'Approved',
            type: 'boolean',
            description: 'comments not shown in site before approved'
        },
        {
            name: 'mail',
            type: 'string'
        },
        {
            name: 'comment',
            type: 'text'
        },
        {
            name: 'post',
            type: 'reference',
            to: [{ type: 'post' }]
        }
    ]
}