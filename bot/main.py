"""
ChatBot24 Studio - Telegram Bot
Бот для квалификации лидов и демонстрации возможностей
"""

import asyncio
import logging
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from dataclasses import dataclass, field

from aiogram import Bot, Dispatcher, F, Router
from aiogram.types import (
    Message, CallbackQuery, InlineKeyboardMarkup, InlineKeyboardButton,
    ReplyKeyboardRemove, KeyboardButton, ReplyKeyboardMarkup
)
from aiogram.filters import Command, CommandStart
from aiogram.fsm.context import FSMContext
from aiogram.fsm.state import State, StatesGroup
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.enums import ParseMode
from aiogram.client.default import DefaultBotProperties

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Environment variables
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
ADMIN_CHAT_ID = int(os.getenv('TELEGRAM_ADMIN_ID', '-3771638944'))

# Initialize bot and dispatcher
bot = Bot(
    token=BOT_TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)
router = Router()

# ============================================================================
# STATES (FSM)
# ============================================================================

class CalculationStates(StatesGroup):
    task = State()
    scale = State()
    timeline = State()
    contact = State()

class DemoStates(StatesGroup):
    niche = State()
    step1 = State()
    step2 = State()
    step3 = State()

class QuestionStates(StatesGroup):
    waiting_question = State()

# ============================================================================
# KEYBOARDS
# ============================================================================

def get_main_menu():
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📊 Рассчитать проект", callback_data="calc_start")],
        [InlineKeyboardButton(text="🎮 Демо-режим", callback_data="demo_start")],
        [InlineKeyboardButton(text="💼 Кейсы и цифры", callback_data="cases")],
        [InlineKeyboardButton(text="❓ Вопрос менеджеру", callback_data="question")],
    ])

# ============================================================================
# HANDLERS
# ============================================================================

@router.message(CommandStart())
async def cmd_start(message: Message, state: FSMContext):
    await state.clear()
    first_name = message.from_user.first_name or "друг"
    
    text = f"""{first_name}, приветствую.

<b>ChatBot24 Studio.</b>
Проектируем и внедряем ботов для продаж и автоматизации.

Выберите действие:"""
    
    await message.answer(text, reply_markup=get_main_menu())

# ============================================================================
# MAIN
# ============================================================================

async def main():
    dp.include_router(router)
    logger.info("Starting bot...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
