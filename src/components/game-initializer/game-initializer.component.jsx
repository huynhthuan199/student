import classNamesBinding from 'classnames/bind';

import FormGroup from '../form-group/form-group.component';
import Button from '../button/button.component';
import styles from './game-initializer.module.scss';
import { useState } from 'react';
import { initTeams } from '../../handlers/models/initmodels';

const css = classNamesBinding.bind(styles);
const GameInitializer = ({ onInitModels, teams, games, turns}) => {
    const [numOfTeams, setNumOfTeams] = useState(10);
    const [numOfGames, setNumOfGames] = useState(1);
    const [numOfTurns, setNumOfTurns] = useState(2);

    const handleCreate = () => {
        onInitModels(numOfTeams, numOfGames, numOfTurns);
    };

    return (
        <div className={css('wrapper')}>
            <h3 className={css('title')}>Khởi tạo game</h3>
            <p className={css('description')}>
                Nhập số lượng đội, nhập số lượng lượt chơi, số lượng trò chơi, sau đó click vào nút Tạo
            </p>
            <div className={css('spacer')}></div>
            <div className={css('form-wrapper')}>
                <FormGroup
                    title="Số lượng đội"
                    type={'number'}
                    value={numOfTeams}
                    minValue="10"
                    onChange={(e) => setNumOfTeams(e.target.value)}
                ></FormGroup>
                <FormGroup
                    title="Số lượt chơi"
                    type={'number'}
                    value={numOfTurns}
                    minValue="1"
                    onChange={(e) => setNumOfTurns(e.target.value)}
                ></FormGroup>
                
            </div>
            <div className={css('form-wrapper')}>
                <FormGroup
                    title="Số lượng trò chơi"
                    type={'number'}
                    minValue="1"
                    value={numOfGames}
                    onChange={(e) => setNumOfGames(e.target.value)}
                ></FormGroup>
                
            </div>
            <Button
                primary
                className={css('btn-create')}
                onClick={handleCreate}
            >
                Tạo
            </Button>
        </div>
    );
};

export default GameInitializer;
