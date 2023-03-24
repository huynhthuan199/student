import './App.css';
import MainLayout from './layouts/main-layout/main-layout.component';
import GlobalStyles from './components/global-styles/global-styles.component';
import Game from './components/game/game.component';

function App() {
    return (
        <GlobalStyles>
            <MainLayout>
                <Game />
            </MainLayout>
        </GlobalStyles>
    );
}

export default App;
