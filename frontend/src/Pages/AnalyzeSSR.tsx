import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SpeedSlalomBasic } from '../Model/Interface';

const host = 'localhost:3001';
interface Props {
    speedSlalomRecords: SpeedSlalomBasic[];
}

const AnalyzeSSR = () => {
    const [SSRecords, setSSRecords] = useState<SpeedSlalomBasic[]>([]);
    const [athletesData, setAthletesData] = useState<any>({});


    useEffect(() => {
        axios.get(`http://${host}/api/getSSRecord`)
            .then(response => {
                setSSRecords(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (SSRecords.length > 0) {
            const athletesData: { [key: string]: any } = {};
            SSRecords.forEach(record => {
                const athleteName = record.AthleteName;
                if (!athletesData[athleteName]) {
                    athletesData[athleteName] = {
                        'SS.12m.min': Infinity,
                        'SS.12m.Max': -Infinity,
                        'SS.12m.Avg': 0,
                        'SS.kicked.min': Infinity,
                        'SS.kicked.Max': -Infinity,
                        'SS.kicked.Avg': 0,
                        'SS.missed.min': Infinity,
                        'SS.missed.Max': -Infinity,
                        'SS.missed.Avg': 0,
                    };
                }
                //     athletesData[athleteName]['SS.12m.min'] = Math.min(athletesData[athleteName]['SS.12m.min'], SSRecords.time12m);
                //     athletesData[athleteName]['SS.12m.Max'] = Math.max(athletesData[athleteName]['SS.12m.Max'], SSRecords.time12m);
                //     athletesData[athleteName]['SS.12m.Avg'] += record.time12m;
                //     athletesData[athleteName]['SS.kicked.min'] = Math.min(athletesData[athleteName]['SS.kicked.min'], SSRecords.kickedCone);
                //     athletesData[athleteName]['SS.kicked.Max'] = Math.max(athletesData[athleteName]['SS.kicked.Max'], SSRecords.kickedCone);
                //     athletesData[athleteName]['SS.kicked.Avg'] += record.kickedCone;
                //     athletesData[athleteName]['SS.missed.min'] = Math.min(athletesData[athleteName]['SS.missed.min'], SSRecords.missedCone);
                //     athletesData[athleteName]['SS.missed.Max'] = Math.max(athletesData[athleteName]['SS.missed.Max'], SSRecords.missedCone);
                //     athletesData[athleteName]['SS.missed.Avg'] += record.missedCone;
                //     athletesData[athleteName]['SS.Endline.min'] = Math.min(athletesData[athleteName]['SS.Endline.min'], SSRecords.endLine ? 1 : 0);
                //     athletesData[athleteName]['SS.Endline.Max'] = Math.max(athletesData[athleteName]['SS.Endline.Max'], SSRecords.endLine ? 1 : 0);
                //     athletesData[athleteName]['SS.Endline.Avg'] += record.endLine ? 1 : 0;
                //     athletesData[athleteName]['SS.FinTime.min'] = Math.min(athletesData[athleteName]['SS.FinTime.min'], SSRecords.time);
                //     athletesData[athleteName]['SS.FinTim.Max'] = Math.max(athletesData[athleteName]['SS.FinTim.Max'], SSRecords.time);
                //     athletesData[athleteName]['SS.FinTim.Avg'] += record.time;
                // });
                // Object.keys(athletesData).forEach(athleteName => {
                //     athletesData[athleteName]['SS.12m.Avg'] /= SSRecords.filter(record => record.AthleteName === athleteName).length;
                //     athletesData[athleteName]['SS.kicked.Avg'] /= SSRecords.filter(record => record.AthleteName === athleteName).length;
                //     athletesData[athleteName]['SS.missed.Avg'] /= SSRecords.filter(record => record.AthleteName === athleteName).length;
                //     athletesData[athleteName]['SS.Endline.Avg'] /= SSRecords.filter(record => record.AthleteName === athleteName).length;
                //     athletesData[athleteName]['SS.FinTim.Avg'] /= SSRecords.filter(record => record.AthleteName === athleteName).length;

            }
            );
        }
    })
    return (
        <div>
            <h1>SSR Analysis</h1>
            <p>SSR Analysis</p>
        </div>
    );
}

export default AnalyzeSSR;