#! /usr/bin/env node
import { DEFAULT_OPTIONS, compileFromFile } from 'json-schema-to-typescript';
import path from 'path';
import fs from 'fs';

DEFAULT_OPTIONS.bannerComment = '/**\n * DO NOT MODIFY IT BY HAND.\n * Generator it with command: `npm run schema`.\n */';
DEFAULT_OPTIONS.style.singleQuote = true;
DEFAULT_OPTIONS.style.tabWidth = 4;

const schemaFolder = path.resolve(__dirname, '..', 'schema');
const outputFolder = path.resolve(__dirname, '..', 'src', '@types');

/**
 * 递归查找schema文件夹内的json文件，并转换成对应dts文件
 */
async function compileFolder(folder = schemaFolder) {
    const files = fs.readdirSync(folder);
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const currFolder = path.join(folder, file);
        const isFile = fs.statSync(currFolder).isFile();
        if (isFile) {
            await compile(currFolder);
        } else {
            await compileFolder(currFolder);
        }
    }
}

/**
 * 将指定json文件转换成dts文件
 * 同时输出到`src/@types`文件夹内
 */
async function compile(filePath: string) {
    if (filePath.match(/.json$/)) {
        const ts = await compileFromFile(filePath, DEFAULT_OPTIONS);
        fs.writeFileSync(getOutPath(filePath), ts);
    }
}

/**
 * 根据json文件路径，生成对应dts文件路径
 */
function getOutPath(filePath: string): string {
    const match = filePath.replace(schemaFolder, '').match(/\w+/);

    const outputFileName = `${outputFolder}/${(match as string[])[0]}.d.ts`;

    if (!fs.existsSync(outputFileName)) {
        fs.mkdirSync(outputFileName.replace(path.basename(outputFileName), ''), { recursive: true });
    }
    return outputFileName;
}

/**
 * 清理输出文件
 */
function cleanOutputFile() {
    const files = fs.readdirSync(schemaFolder);
    files.forEach(file => {
        const filePath = path.join(outputFolder, `${file}.d.ts`);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
    });
}

cleanOutputFile();
compileFolder(schemaFolder);
