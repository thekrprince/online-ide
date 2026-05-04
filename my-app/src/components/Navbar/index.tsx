import type { Dispatch, SetStateAction } from "react";
import "./navbar.css";

interface NavbarProps {
    userLang: string,
    setUserLang: Dispatch<SetStateAction<string>>,
    userTheme: string,
    setUserTheme: React.Dispatch<SetStateAction<string>>,
    fontSize: number,
    setFontSize: React.Dispatch<SetStateAction<number>>
}

const Navbar = ({
    userLang, setUserLang, userTheme,
    setUserTheme, fontSize, setFontSize }: NavbarProps) => {
    const languages = [
        { value: "javascript", label: "javascript" },
        { value: "c", label: "C" },
        { value: "cpp", label: "C++" },
        { value: "python", label: "Python" },
        { value: "java", label: "Java" },
    ];
    const themes = [
        { value: "vs-dark", label: "Dark" },
        { value: "light", label: "Light" },
    ]
    return (
        <div className="navbar">
            <h1>Online Code Compiler</h1>
            <select options={languages} value={userLang}
                onChange={(e) => setUserLang(e.value)}
                placeholder={userLang} />
            <select options={themes} value={userTheme}
                onChange={(e) => setUserTheme(e.value)}
                placeholder={userTheme} />
            <label>Font Size</label>
            <input type="range" min="18" max="30"
                value={fontSize} step="2"
                onChange={(e) => { setFontSize(e.target.value) }} />
        </div>
    )
}

export default Navbar;