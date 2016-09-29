import {timeParse, csvParseRows, csv} from 'd3'
const dateFormat = timeParse('%m/%d/%Y')

export const getRows = () => {
    return new Promise((resolve, reject) => {
        csv('/data/h1bs.csv')
            .row((d) => {
                if (!d['base salary']) {
                    return null;
                }

                return {
                    employer: d.employer,
                    submit_date: dateFormat(d['submit date']),
                    start_date: dateFormat(d['start date']),
                    case_status: d['case status'],
                    job_title: d['job title'],
                    base_salary: Number(d['base salary']),
                    salary_to: d['salary to'] ? Number(d['salary to']) : null,
                    city: d.city,
                    state: d.state
                }
            })
            .get((error, rows) => {
                if (error) {
                    console.error(error)
                    console.error(error.stack)
                    reject(error)
                }
                else {
                    resolve(rows)
                }
            })
    })
}

