interface VSCodeTheme {
  name: string;
  type: string;
  colors: {
    [key: string]: string;
  };
  tokenColors: Array<{
    name?: string;
    scope: string | string[];
    settings: {
      foreground?: string;
      background?: string;
      fontStyle?: string;
    };
  }>;
}

interface FormatOptions {
  indentSize: number;
  useTabs: boolean;
  lineNumbers: boolean;
  wrapCode: boolean;
}

interface TokenMatch {
  type: string;
  value: string;
  start: number;
  end: number;
}

class TextFormatter {
  private theme: VSCodeTheme;
  private options: FormatOptions;

  constructor(theme: VSCodeTheme, options: Partial<FormatOptions> = {}) {
    this.theme = theme;
    this.options = {
      indentSize: 2,
      useTabs: false,
      lineNumbers: true,
      wrapCode: true,
      ...options,
    };
  }

  /**
   * Reconhece a linguagem do código baseado em padrões e extensões
   */
  public recognizeLanguage(code: string, filename?: string): string {
    // Reconhecimento por extensão de arquivo
    if (filename) {
      const ext = filename.split(".").pop()?.toLowerCase();
      const extensionMap: { [key: string]: string } = {
        js: "javascript",
        ts: "typescript",
        jsx: "javascript",
        tsx: "typescript",
        py: "python",
        java: "java",
        cpp: "cpp",
        c: "c",
        cs: "csharp",
        php: "php",
        rb: "ruby",
        go: "go",
        rs: "rust",
        html: "html",
        css: "css",
        json: "json",
        xml: "xml",
        sql: "sql",
        sh: "bash",
        md: "markdown",
      };

      if (ext && extensionMap[ext]) {
        return extensionMap[ext];
      }
    }

    // Reconhecimento por padrões no código
    const patterns = [
      { regex: /import\s+.*from\s+['"]/, lang: "javascript" },
      { regex: /interface\s+\w+|type\s+\w+\s*=/, lang: "typescript" },
      { regex: /def\s+\w+\(|import\s+\w+|from\s+\w+\s+import/, lang: "python" },
      { regex: /public\s+class\s+\w+|import\s+java\./, lang: "java" },
      { regex: /#include\s*<|int\s+main\s*\(/, lang: "cpp" },
      { regex: /using\s+System;|namespace\s+\w+/, lang: "csharp" },
      { regex: /<?php|<\?=/, lang: "php" },
      { regex: /func\s+\w+\(|package\s+main/, lang: "go" },
      { regex: /fn\s+\w+\(|use\s+std::/, lang: "rust" },
      { regex: /<html|<!DOCTYPE\s+html/i, lang: "html" },
      { regex: /\{\s*["\w-]+\s*:\s*[^}]+\}/, lang: "css" },
      { regex: /^\s*\{[\s\S]*\}\s*$/, lang: "json" },
      { regex: /<\?xml|<\w+[^>]*>/, lang: "xml" },
      { regex: /SELECT\s+.*FROM|CREATE\s+TABLE/i, lang: "sql" },
    ];

    for (const pattern of patterns) {
      if (pattern.regex.test(code)) {
        return pattern.lang;
      }
    }

    return "plaintext";
  }

  /**
   * Lê e processa o esquema de cores do tema VS Code
   */
  public readColorScheme(): { [tokenType: string]: any } {
    const colorMap: { [key: string]: any } = {};

    // Cores básicas do tema
    colorMap.background = this.theme.colors["editor.background"] || "#1e1e1e";
    colorMap.foreground = this.theme.colors["editor.foreground"] || "#d4d4d4";
    colorMap.lineNumber =
      this.theme.colors["editorLineNumber.foreground"] || "#858585";

    // Mapeia os token colors
    this.theme.tokenColors.forEach((token) => {
      const scopes = Array.isArray(token.scope) ? token.scope : [token.scope];
      scopes.forEach((scope) => {
        colorMap[scope] = {
          color: token.settings.foreground,
          backgroundColor: token.settings.background,
          fontStyle: token.settings.fontStyle,
        };
      });
    });

    return colorMap;
  }

  /**
   * Tokeniza o código baseado na linguagem
   */
  private tokenizeCode(code: string, language: string): TokenMatch[] {
    const tokens: TokenMatch[] = [];

    const tokenPatterns: {
      [lang: string]: Array<{ type: string; regex: RegExp }>;
    } = {
      javascript: [
        {
          type: "keyword",
          regex:
            /\b(const|let|var|function|if|else|for|while|return|import|export|class|extends|async|await|try|catch|finally)\b/g,
        },
        { type: "string", regex: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g },
        { type: "comment", regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm },
        { type: "number", regex: /\b\d+\.?\d*\b/g },
        { type: "operator", regex: /[+\-*/%=<>!&|]+/g },
        { type: "punctuation", regex: /[{}[\]();,.:]/g },
      ],
      typescript: [
        {
          type: "keyword",
          regex:
            /\b(const|let|var|function|if|else|for|while|return|import|export|class|extends|interface|type|enum|async|await|try|catch|finally|public|private|protected)\b/g,
        },
        {
          type: "type",
          regex: /\b(string|number|boolean|object|any|void|never|unknown)\b/g,
        },
        { type: "string", regex: /(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g },
        { type: "comment", regex: /(\/\/.*$|\/\*[\s\S]*?\*\/)/gm },
        { type: "number", regex: /\b\d+\.?\d*\b/g },
        { type: "operator", regex: /[+\-*/%=<>!&|]+/g },
        { type: "punctuation", regex: /[{}[\]();,.:]/g },
      ],
      python: [
        {
          type: "keyword",
          regex:
            /\b(def|class|if|elif|else|for|while|return|import|from|try|except|finally|with|as|lambda|yield|async|await)\b/g,
        },
        { type: "string", regex: /(["'])((?:\\.|(?!\1)[^\\])*?)\1/g },
        { type: "comment", regex: /#.*$/gm },
        { type: "number", regex: /\b\d+\.?\d*\b/g },
        { type: "operator", regex: /[+\-*/%=<>!&|]+/g },
        { type: "punctuation", regex: /[{}[\]();,.:]/g },
      ],
      html: [
        {
          type: "tag",
          regex:
            /<\/?[\w-]+(?:\s+[\w-]+(?:=(?:"[^"]*"|'[^']*'|[^\s>]+))?)*\s*\/?>/g,
        },
        { type: "attribute", regex: /\s([\w-]+)(?:=)/g },
        { type: "string", regex: /=\s*(["'])((?:\\.|(?!\1)[^\\])*?)\1/g },
        { type: "comment", regex: /<!--[\s\S]*?-->/g },
      ],
      css: [
        {
          type: "selector",
          regex: /[.#]?[\w-]+(?:\s*[>+~]\s*[\w-]+)*(?=\s*{)/g,
        },
        { type: "property", regex: /\b[\w-]+(?=\s*:)/g },
        { type: "value", regex: /:\s*([^;{]+)/g },
        { type: "comment", regex: /\/\*[\s\S]*?\*\//g },
        { type: "punctuation", regex: /[{}();:,]/g },
      ],
    };

    const patterns = tokenPatterns[language] || tokenPatterns.javascript;

    // Aplicar cada padrão
    patterns.forEach((pattern) => {
      let match;
      while ((match = pattern.regex.exec(code)) !== null) {
        tokens.push({
          type: pattern.type,
          value: match[0],
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    });

    // Ordenar tokens por posição
    tokens.sort((a, b) => a.start - b.start);

    return tokens;
  }

  /**
   * Aplica indentação correta ao código
   */
  private indentCode(code: string, language: string): string {
    const lines = code.split("\n");
    const indentChar = this.options.useTabs
      ? "\t"
      : " ".repeat(this.options.indentSize);
    let indentLevel = 0;

    const indentedLines = lines.map((line) => {
      const trimmedLine = line.trim();

      if (!trimmedLine) return "";

      // Diminui indentação para linhas que fecham blocos
      if (/^[}\])]/.test(trimmedLine)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      const indentedLine = indentChar.repeat(indentLevel) + trimmedLine;

      // Aumenta indentação para linhas que abrem blocos
      if (/[{[(]\s*$/.test(trimmedLine) && !/^\/\//.test(trimmedLine)) {
        indentLevel++;
      }

      return indentedLine;
    });

    return indentedLines.join("\n");
  }

  /**
   * Aplica cores aos tokens baseado no esquema
   */
  private colorizeTokens(tokens: TokenMatch[], colorScheme: any): string {
    let result = "";
    let lastIndex = 0;

    tokens.forEach((token) => {
      // Adiciona texto não tokenizado
      if (token.start > lastIndex) {
        result += this.escapeHtml(
          token.value.substring(lastIndex, token.start)
        );
      }

      // Obtém estilo para o token
      const style = this.getTokenStyle(token.type, colorScheme);
      const escapedValue = this.escapeHtml(token.value);

      if (style) {
        result += `<span style="${style}">${escapedValue}</span>`;
      } else {
        result += escapedValue;
      }

      lastIndex = token.end;
    });

    return result;
  }

  /**
   * Obtém estilo CSS para um tipo de token
   */
  private getTokenStyle(tokenType: string, colorScheme: any): string {
    const tokenMapping: { [key: string]: string[] } = {
      keyword: ["keyword", "keyword.control", "storage.type"],
      string: ["string", "string.quoted"],
      comment: ["comment", "comment.line", "comment.block"],
      number: ["constant.numeric"],
      operator: ["keyword.operator"],
      type: ["entity.name.type", "support.type"],
      tag: ["entity.name.tag"],
      attribute: ["entity.other.attribute-name"],
      property: ["support.type.property-name"],
      value: ["support.constant.property-value"],
      punctuation: ["punctuation"],
    };

    const scopes = tokenMapping[tokenType] || [tokenType];

    for (const scope of scopes) {
      if (colorScheme[scope]) {
        const token = colorScheme[scope];
        let style = "";

        if (token.color) {
          style += `color: ${token.color};`;
        }
        if (token.backgroundColor) {
          style += `background-color: ${token.backgroundColor};`;
        }
        if (token.fontStyle) {
          if (token.fontStyle.includes("bold")) style += "font-weight: bold;";
          if (token.fontStyle.includes("italic"))
            style += "font-style: italic;";
          if (token.fontStyle.includes("underline"))
            style += "text-decoration: underline;";
        }

        return style;
      }
    }

    return "";
  }

  /**
   * Escapa caracteres HTML
   */
  private escapeHtml(text: string): string {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Gera HTML completo com o código formatado
   */
  private generateHtml(
    colorizedCode: string,
    language: string,
    colorScheme: any
  ): string {
    const lines = colorizedCode.split("\n");
    const backgroundColor = colorScheme.background || "#1e1e1e";
    const foregroundColor = colorScheme.foreground || "#d4d4d4";
    const lineNumberColor = colorScheme.lineNumber || "#858585";

    let html = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Código Formatado - ${language}</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            background-color: ${backgroundColor};
            color: ${foregroundColor};
            line-height: 1.5;
        }
        .code-container {
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .code-header {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 10px 15px;
            font-size: 14px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .code-content {
            display: flex;
            overflow-x: auto;
        }
        .line-numbers {
            background-color: rgba(0, 0, 0, 0.2);
            padding: 20px 10px;
            text-align: right;
            color: ${lineNumberColor};
            user-select: none;
            min-width: 40px;
            font-size: 14px;
        }
        .code-lines {
            padding: 20px;
            flex: 1;
            white-space: pre;
            font-size: 14px;
            overflow-x: auto;
        }
        .line {
            display: block;
            min-height: 1.5em;
        }
        ${this.options.wrapCode ? ".code-lines { white-space: pre-wrap; }" : ""}
    </style>
</head>
<body>
    <div class="code-container">
        <div class="code-header">
            <strong>Linguagem:</strong> ${language.toUpperCase()}
        </div>
        <div class="code-content">`;

    if (this.options.lineNumbers) {
      html += `
            <div class="line-numbers">`;
      for (let i = 1; i <= lines.length; i++) {
        html += `${i}\n`;
      }
      html += `</div>`;
    }

    html += `
            <div class="code-lines">`;

    lines.forEach((line) => {
      html += `<span class="line">${line || " "}</span>\n`;
    });

    html += `
            </div>
        </div>
    </div>
</body>
</html>`;

    return html;
  }

  /**
   * Função principal que formata o código
   */
  public format(code: string, filename?: string): string {
    // 1. Reconhecer linguagem
    const language = this.recognizeLanguage(code, filename);

    // 2. Ler esquema de cores
    const colorScheme = this.readColorScheme();

    // 3. Indentar código
    const indentedCode = this.indentCode(code, language);

    // 4. Tokenizar código
    const tokens = this.tokenizeCode(indentedCode, language);

    // 5. Colorir tokens
    const colorizedCode = this.colorizeTokens(tokens, colorScheme);

    // 6. Gerar HTML final
    return this.generateHtml(colorizedCode, language, colorScheme);
  }

  /**
   * Atualiza o tema
   */
  public setTheme(theme: VSCodeTheme): void {
    this.theme = theme;
  }

  /**
   * Atualiza as opções de formatação
   */
  public setOptions(options: Partial<FormatOptions>): void {
    this.options = { ...this.options, ...options };
  }
}

// Exemplo de uso
export default TextFormatter;

// Tema de exemplo (Dark+ do VS Code)
export const darkPlusTheme: VSCodeTheme = {
  name: "Dark+ (default dark)",
  type: "dark",
  colors: {
    "editor.background": "#1e1e1e",
    "editor.foreground": "#d4d4d4",
    "editorLineNumber.foreground": "#858585",
  },
  tokenColors: [
    {
      scope: "keyword",
      settings: {
        foreground: "#569cd6",
      },
    },
    {
      scope: "string",
      settings: {
        foreground: "#ce9178",
      },
    },
    {
      scope: "comment",
      settings: {
        foreground: "#6a9955",
        fontStyle: "italic",
      },
    },
    {
      scope: "constant.numeric",
      settings: {
        foreground: "#b5cea8",
      },
    },
    {
      scope: "entity.name.type",
      settings: {
        foreground: "#4ec9b0",
      },
    },
    {
      scope: "entity.name.tag",
      settings: {
        foreground: "#569cd6",
      },
    },
    {
      scope: "entity.other.attribute-name",
      settings: {
        foreground: "#9cdcfe",
      },
    },
  ],
};

/*
// Exemplo de uso:
const formatter = new TextFormatter(darkPlusTheme, {
  indentSize: 2,
  lineNumbers: true,
  wrapCode: false
});

const code = `
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));
`;

const formattedHtml = formatter.format(code, 'example.js');
console.log(formattedHtml);
*/
