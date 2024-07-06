import axios from "axios";
import fs from "fs-extra";
import { fileURLToPath } from "url";
import { dirname } from "path";
import moment from "moment"; // 未使用到，但保留

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URL = "https://ic-common.pmang.cloud/static/bdt_book/thumbnail/";

const API_CHARACTERS_KOREA =
    "https://webservice-api.mbrown.pmang.cloud/v1/book/character/getAll";
// "https://browndust-api.pmang.cloud/v1/book/character/getAll";
// const API_CHARACTERS_KOREA = 'https://raw.githubusercontent.com/explooosion/browndust-share/6cf779be53f46117cb7aed659ea0d0f0c829751c/pre-work/getAll.json';

const API_CHARACTERS_FILE_NAME = `getAll.json`;
const LOG_BASE_DIR = `./pre-work/log`;
const CURRENT_DATE = moment().format("YYYY-MM-DD");
const LOG_DIR = `${LOG_BASE_DIR}/${CURRENT_DATE}`;
const SUCCESS_LOG_FILE_NAME = `${LOG_DIR}/success.log`;
const ERROR_LOG_FILE_NAME = `${LOG_DIR}/error.log`;

// 刪除當前日期目錄及其內容（如果存在），然後重新創建目錄
fs.removeSync(LOG_DIR);
fs.ensureDirSync(LOG_DIR);

// 下載 JSON 資源
axios
    .get(API_CHARACTERS_KOREA)
    .then((response) => {
        console.log("Download api resource...");
        fs.writeFileSync(
            `${__dirname}/${API_CHARACTERS_FILE_NAME}`,
            JSON.stringify(response.data),
        );
        downloadThumbnails();
    })
    .catch((error) => {
        console.error("Error downloading API resource:", error);
    });

async function downloadThumbnails() {
    const successLogStream = fs.createWriteStream(SUCCESS_LOG_FILE_NAME, {
        flags: "a",
    });
    const errorLogStream = fs.createWriteStream(ERROR_LOG_FILE_NAME, {
        flags: "a",
    });

    try {
        const thumbnails = JSON.parse(
            await fs.readFile(
                `${__dirname}/${API_CHARACTERS_FILE_NAME}`,
                "utf8",
            ),
        );

        for (const { _uiIconImageName } of thumbnails) {
            const imageName = `${_uiIconImageName.split("*")[1]}.png`;
            const url = `${URL}${imageName}`;

            try {
                const response = await axios({
                    method: "get",
                    url,
                    responseType: "stream",
                });
                const path = `./public/resource/thumbnail/${imageName}`;
                const writer = fs.createWriteStream(path);
                response.data.pipe(writer);
                await new Promise((resolve, reject) => {
                    writer.on("finish", resolve);
                    writer.on("error", reject);
                });
                process.stdout.write(`Downloaded: ${url}\r`);
                successLogStream.write(`Downloaded: ${url}\n`);
            } catch (error) {
                const errorMessage = `Error downloading ${url}: ${error.message}\n`;
                console.error(`\n${errorMessage}`);
                errorLogStream.write(errorMessage);
            }
        }

        console.log("\nAll thumbnails processed.");
        // fs.unlinkSync(`${__dirname}/${API_CHARACTERS_FILE_NAME}`);
    } catch (error) {
        const errorMessage = `Error in downloading thumbnails: ${error.message}\n`;
        console.error(errorMessage);
        errorLogStream.write(errorMessage);
    } finally {
        successLogStream.end();
        errorLogStream.end();
    }
}
