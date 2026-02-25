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
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '7703636299:AAEK6SlB3CtP2Qvw1iPq0U3YrNXdzU4F9vI')
ADMIN_CHAT_ID = int(os.getenv('TELEGRAM_ADMIN_ID', '-3771638944'))
SUPABASE_URL = os.getenv('SUPABASE_URL', 'https://gihizzpuzcuctitvwavz.supabase.co')
SUPABASE_KEY = os.getenv('SUPABASE_KEY', 'sb_publishable_N4YOSxjrIZZguH3jHDxWtQ_3KklLju1')

# Initialize bot and dispatcher
bot = Bot(
    token=BOT_TOKEN,
    default=DefaultBotProperties(parse_mode=ParseMode.HTML)
)
storage = MemoryStorage()
dp = Dispatcher(storage=storage)
router = Router()

# ============================================================================
# DATA CLASSES
# ============================================================================

@dataclass
class LeadData:
    """Структура данных лида"""
    user_id: int
    username: Optional[str] = None
    first_name: Optional[str] = None
    phone: Optional[str] = None
    task: Optional[str] = None
    scale: Optional[str] = None
    timeline: Optional[str] = None
    score: int = 0
    tags: list = field(default_factory=list)
    source: str = "telegram_bot"
    utm_params: Dict[str, str] = field(default_factory=dict)
    created_at: datetime = field(default_factory=datetime.now)

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

def get_main_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📊 Рассчитать проект", callback_data="calc_start")],
        [InlineKeyboardButton(text="🎮 Демо-режим", callback_data="demo_start")],
        [InlineKeyboardButton(text="💼 Кейсы и цифры", callback_data="cases")],
        [InlineKeyboardButton(text="❓ Вопрос менеджеру", callback_data="question")],
    ])

def get_back_to_menu() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")]
    ])

def get_calc_task_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🛒 Продажи / Воронки", callback_data="calc_task:sales")],
        [InlineKeyboardButton(text="🎧 Поддержка / FAQ", callback_data="calc_task:support")],
        [InlineKeyboardButton(text="📅 Запись / Бронирование", callback_data="calc_task:booking")],
        [InlineKeyboardButton(text="🔗 Интеграция с CRM", callback_data="calc_task:crm")],
        [InlineKeyboardButton(text="⚙️ Другое", callback_data="calc_task:other")],
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
    ])

def get_calc_scale_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📦 до 100", callback_data="calc_scale:small")],
        [InlineKeyboardButton(text="📦📦 100–500", callback_data="calc_scale:medium")],
        [InlineKeyboardButton(text="📦📦📦 500+", callback_data="calc_scale:large")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="calc_back:task")],
    ])

def get_calc_timeline_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="⚡ До 30 дней", callback_data="calc_timeline:hot")],
        [InlineKeyboardButton(text="📅 1–3 месяца", callback_data="calc_timeline:warm")],
        [InlineKeyboardButton(text="🔍 Изучаю рынок", callback_data="calc_timeline:cold")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="calc_back:scale")],
    ])

def get_calc_contact_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📱 Поделиться контактом", callback_data="calc_contact:share")],
        [InlineKeyboardButton(text="✍️ Ввести вручную", callback_data="calc_contact:manual")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="calc_back:timeline")],
    ])

def get_demo_niche_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="🏢 Недвижимость", callback_data="demo:realty")],
        [InlineKeyboardButton(text="🎓 Онлайн-школа", callback_data="demo:school")],
        [InlineKeyboardButton(text="🏥 Услуги / Клиника", callback_data="demo:clinic")],
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
    ])

def get_demo_realty_step1() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="до 10 млн ₽", callback_data="demo_r1:budget1")],
        [InlineKeyboardButton(text="10–20 млн ₽", callback_data="demo_r1:budget2")],
        [InlineKeyboardButton(text="20+ млн ₽", callback_data="demo_r1:budget3")],
        [InlineKeyboardButton(text="⬅️ Выход", callback_data="main_menu")],
    ])

def get_demo_realty_step2() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Центральный", callback_data="demo_r2:central")],
        [InlineKeyboardButton(text="Спальный район", callback_data="demo_r2:sleep")],
        [InlineKeyboardButton(text="Пригород", callback_data="demo_r2:suburb")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="demo:realty")],
    ])

def get_demo_realty_step3() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Ипотека", callback_data="demo_r3:mortgage")],
        [InlineKeyboardButton(text="Наличные", callback_data="demo_r3:cash")],
        [InlineKeyboardButton(text="Рассрочка", callback_data="demo_r3:installment")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="demo_r2:back")],
    ])

def get_demo_school_step1() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Новая профессия", callback_data="demo_s1:career")],
        [InlineKeyboardButton(text="Повышение квалификации", callback_data="demo_s1:upgrade")],
        [InlineKeyboardButton(text="Доп. доход", callback_data="demo_s1:income")],
        [InlineKeyboardButton(text="⬅️ Выход", callback_data="main_menu")],
    ])

def get_demo_school_step2() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Срочно", callback_data="demo_s2:urgent")],
        [InlineKeyboardButton(text="1–3 месяца", callback_data="demo_s2:soon")],
        [InlineKeyboardButton(text="Пока изучаю", callback_data="demo_s2:research")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="demo:school")],
    ])

def get_demo_school_step3() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="С куратором", callback_data="demo_s3:curator")],
        [InlineKeyboardButton(text="Самостоятельно", callback_data="demo_s3:self")],
        [InlineKeyboardButton(text="Индивидуально", callback_data="demo_s3:individual")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="demo_s2:back")],
    ])

def get_demo_clinic_step1() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Консультация", callback_data="demo_c1:consult")],
        [InlineKeyboardButton(text="Диагностика", callback_data="demo_c1:diagnostic")],
        [InlineKeyboardButton(text="Повторный приём", callback_data="demo_c1:repeat")],
        [InlineKeyboardButton(text="⬅️ Выход", callback_data="main_menu")],
    ])

def get_demo_clinic_step2() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Сегодня", callback_data="demo_c2:today")],
        [InlineKeyboardButton(text="Завтра", callback_data="demo_c2:tomorrow")],
        [InlineKeyboardButton(text="На этой неделе", callback_data="demo_c2:week")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="demo:clinic")],
    ])

def get_demo_clinic_step3() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="Утро", callback_data="demo_c3:morning")],
        [InlineKeyboardButton(text="День", callback_data="demo_c3:day")],
        [InlineKeyboardButton(text="Вечер", callback_data="demo_c3:evening")],
        [InlineKeyboardButton(text="⬅️ Назад", callback_data="demo_c2:back")],
    ])

def get_demo_final_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📊 Рассчитать для моего бизнеса", callback_data="calc_start")],
        [InlineKeyboardButton(text="💼 Другие кейсы", callback_data="cases")],
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
    ])

def get_cases_keyboard() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="💼 Все кейсы на сайте", url="https://www.chatbot24.su/cases")],
        [InlineKeyboardButton(text="📊 Рассчитать мой проект", callback_data="calc_start")],
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
    ])

def get_error_keyboard(attempt: int = 1) -> InlineKeyboardMarkup:
    if attempt == 1:
        return InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="📊 Рассчитать проект", callback_data="calc_start")],
            [InlineKeyboardButton(text="🎮 Демо-режим", callback_data="demo_start")],
            [InlineKeyboardButton(text="💼 Кейсы", callback_data="cases")],
            [InlineKeyboardButton(text="❓ Вопрос менеджеру", callback_data="question")],
        ])
    else:
        return InlineKeyboardMarkup(inline_keyboard=[
            [InlineKeyboardButton(text="👨‍💼 Позвать менеджера", callback_data="escalate")],
            [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
        ])

# ============================================================================
# SCORING SYSTEM
# ============================================================================

def calculate_lead_score(lead: LeadData) -> int:
    score = 0
    if lead.timeline == "hot":
        score += 40
    elif lead.timeline == "warm":
        score += 20
    elif lead.timeline == "cold":
        score += 5
    
    if lead.scale == "large":
        score += 20
    elif lead.scale == "medium":
        score += 10
    
    if lead.phone:
        score += 20
    
    return score

def get_lead_category(score: int) -> str:
    if score >= 80:
        return "Lead_Hot"
    elif score >= 50:
        return "Lead_Warm"
    else:
        return "Lead_Cold"

# ============================================================================
# NOTIFICATIONS
# ============================================================================

async def notify_manager(lead: LeadData):
    score = calculate_lead_score(lead)
    category = get_lead_category(score)
    
    task_names = {
        "sales": "Продажи / Воронки",
        "support": "Поддержка / FAQ",
        "booking": "Запись / Бронирование",
        "crm": "Интеграция с CRM",
        "other": "Другое"
    }
    scale_names = {
        "small": "до 100",
        "medium": "100–500",
        "large": "500+"
    }
    timeline_names = {
        "hot": "До 30 дней",
        "warm": "1–3 месяца",
        "cold": "Изучаю рынок"
    }
    
    emoji = "🔥" if category == "Lead_Hot" else "⚡" if category == "Lead_Warm" else "❄️"
    
    text = f"""{emoji} <b>Новый лид: {category}</b>

👤 <b>Имя:</b> {lead.first_name or '—'}
📱 <b>Telegram:</b> @{lead.username or '—'}
☎️ <b>Телефон:</b> {lead.phone or '—'}

📊 <b>Задача:</b> {task_names.get(lead.task, lead.task or '—')}
📦 <b>Объём:</b> {scale_names.get(lead.scale, lead.scale or '—')} заявок/мес
📅 <b>Срок:</b> {timeline_names.get(lead.timeline, lead.timeline or '—')}

🏆 <b>Скоринг:</b> {score} баллов
🏷 <b>Теги:</b> {', '.join(lead.tags) if lead.tags else '—'}
🔗 <b>Источник:</b> {lead.source}

🆔 <b>User ID:</b> <code>{lead.user_id}</code>"""
    
    try:
        await bot.send_message(
            chat_id=ADMIN_CHAT_ID,
            text=text,
            parse_mode=ParseMode.HTML
        )
        logger.info(f"Notification sent for lead {lead.user_id}")
    except Exception as e:
        logger.error(f"Failed to send notification: {e}")

async def notify_escalation(user_id: int, username: str, first_name: str, message_text: str):
    text = f"""🚨 <b>ESCALATION</b>

Пользователь не смог получить ответ от бота.

👤 <b>Имя:</b> {first_name or '—'}
📱 <b>Telegram:</b> @{username or '—'}
🆔 <b>User ID:</b> <code>{user_id}</code>

💬 <b>Сообщение:</b>
<code>{message_text[:500]}</code>

⚡ Требуется помощь менеджера!"""
    
    try:
        await bot.send_message(
            chat_id=ADMIN_CHAT_ID,
            text=text,
            parse_mode=ParseMode.HTML
        )
    except Exception as e:
        logger.error(f"Failed to send escalation: {e}")

async def notify_support_request(user_id: int, username: str, first_name: str, question: str, ticket_id: str):
    text = f"""❓ <b>Новый вопрос менеджеру</b>

🎫 <b>Ticket ID:</b> #{ticket_id}

👤 <b>Имя:</b> {first_name or '—'}
📱 <b>Telegram:</b> @{username or '—'}
🆔 <b>User ID:</b> <code>{user_id}</code>

💬 <b>Вопрос:</b>
{question}

⏰ Среднее время ответа: 1-2 часа"""
    
    try:
        await bot.send_message(
            chat_id=ADMIN_CHAT_ID,
            text=text,
            parse_mode=ParseMode.HTML
        )
    except Exception as e:
        logger.error(f"Failed to send support request: {e}")

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

Этот бот — реальный пример нашей работы:
⚡ Мгновенная логика
🎯 Квалификация лидов
🔗 Интеграция с CRM

Выберите действие:"""
    
    await message.answer(text, reply_markup=get_main_menu())

@router.callback_query(F.data == "main_menu")
async def main_menu(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    await callback.message.edit_text("Главное меню:", reply_markup=get_main_menu())
    await callback.answer()

# ============================================================================
# CALCULATION FLOW
# ============================================================================

@router.callback_query(F.data == "calc_start")
async def calc_start(callback: CallbackQuery, state: FSMContext):
    await state.set_state(CalculationStates.task)
    text = """<b>[Шаг 1 из 4]</b>
Какая цель приоритетна?"""
    await callback.message.edit_text(text, reply_markup=get_calc_task_keyboard())
    await callback.answer()

@router.callback_query(F.data.startswith("calc_task:"))
async def calc_task_selected(callback: CallbackQuery, state: FSMContext):
    task = callback.data.split(":")[1]
    await state.update_data(task=task)
    await state.set_state(CalculationStates.scale)
    text = """<b>[Шаг 2 из 4]</b>
Сколько заявок в месяц планируете обрабатывать?

Это влияет на архитектуру и нагрузку."""
    await callback.message.edit_text(text, reply_markup=get_calc_scale_keyboard())
    await callback.answer()

@router.callback_query(F.data.startswith("calc_scale:"))
async def calc_scale_selected(callback: CallbackQuery, state: FSMContext):
    scale = callback.data.split(":")[1]
    await state.update_data(scale=scale)
    await state.set_state(CalculationStates.timeline)
    text = """<b>[Шаг 3 из 4]</b>
Когда планируете запуск?"""
    await callback.message.edit_text(text, reply_markup=get_calc_timeline_keyboard())
    await callback.answer()

@router.callback_query(F.data.startswith("calc_timeline:"))
async def calc_timeline_selected(callback: CallbackQuery, state: FSMContext):
    timeline = callback.data.split(":")[1]
    await state.update_data(timeline=timeline)
    await state.set_state(CalculationStates.contact)
    text = """<b>[Шаг 4 из 4]</b>
Подготовим для вас:
• Архитектуру сценариев
• Смету
• План интеграций

Укажите контакт для связи. Менеджер пришлет КП."""
    await callback.message.edit_text(text, reply_markup=get_calc_contact_keyboard())
    await callback.answer()

@router.callback_query(F.data == "calc_contact:share")
async def calc_contact_share(callback: CallbackQuery, state: FSMContext):
    kb = ReplyKeyboardMarkup(
        keyboard=[[KeyboardButton(text="📱 Поделиться контактом", request_contact=True)]],
        resize_keyboard=True,
        one_time_keyboard=True
    )
    await callback.message.answer(
        "Нажмите кнопку ниже, чтобы поделиться контактом:",
        reply_markup=kb
    )
    await callback.answer()

@router.message(CalculationStates.contact, F.contact)
async def calc_contact_received(message: Message, state: FSMContext):
    data = await state.get_data()
    
    lead = LeadData(
        user_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name,
        phone=message.contact.phone_number,
        task=data.get("task"),
        scale=data.get("scale"),
        timeline=data.get("timeline"),
        tags=["contact_received", f"lead_{data.get('timeline', 'unknown')}"]
    )
    
    lead.score = calculate_lead_score(lead)
    lead.tags.append(get_lead_category(lead.score))
    
    await notify_manager(lead)
    
    await message.answer("Контакт сохранен.", reply_markup=ReplyKeyboardRemove())
    
    text = """Контакт сохранен.
Заполните бриф (5 минут).
После отправки — подготовим КП в течение 24 часов.

Сейчас в работе 12 проектов.
Средний срок запуска — 10 дней."""
    
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📝 Заполнить бриф", url="https://www.chatbot24.su/brief")],
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
    ])
    
    await message.answer(text, reply_markup=kb)
    await state.clear()

@router.callback_query(F.data == "calc_contact:manual")
async def calc_contact_manual(callback: CallbackQuery, state: FSMContext):
    await callback.message.edit_text(
        "Пожалуйста, отправьте ваш номер телефона в формате +7XXXXXXXXXX:"
    )
    await callback.answer()

@router.message(CalculationStates.contact)
async def calc_contact_manual_received(message: Message, state: FSMContext):
    phone = message.text.strip()
    
    if not (phone.startswith('+7') or phone.startswith('8')) or len(phone) < 10:
        await message.answer(
            "Пожалуйста, введите корректный номер телефона в формате +7XXXXXXXXXX"
        )
        return
    
    data = await state.get_data()
    
    lead = LeadData(
        user_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name,
        phone=phone,
        task=data.get("task"),
        scale=data.get("scale"),
        timeline=data.get("timeline"),
        tags=["contact_received", f"lead_{data.get('timeline', 'unknown')}"]
    )
    
    lead.score = calculate_lead_score(lead)
    lead.tags.append(get_lead_category(lead.score))
    
    await notify_manager(lead)
    
    text = """Контакт сохранен.
Заполните бриф (5 минут).
После отправки — подготовим КП в течение 24 часов.

Сейчас в работе 12 проектов.
Средний срок запуска — 10 дней."""
    
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="📝 Заполнить бриф", url="https://www.chatbot24.su/brief")],
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
    ])
    
    await message.answer(text, reply_markup=kb)
    await state.clear()

# ============================================================================
# DEMO FLOW
# ============================================================================

@router.callback_query(F.data == "demo_start")
async def demo_start(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.niche)
    text = """Выберите нишу для симуляции.
Вы пройдете путь клиента вашего будущего бота.
Это займёт 2–3 минуты."""
    await callback.message.edit_text(text, reply_markup=get_demo_niche_keyboard())
    await callback.answer()

# DEMO: REALTY
@router.callback_query(F.data == "demo:realty")
async def demo_realty_start(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step1)
    await state.update_data(demo_niche="realty")
    text = """🏢 <b>Демо-режим: Недвижимость</b>

Вы — клиент. Я — бот агентства.
Подберем квартиру.

<b>Вопрос 1 из 3:</b>
Какой бюджет?"""
    await callback.message.edit_text(text, reply_markup=get_demo_realty_step1())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_r1:"))
async def demo_realty_step1(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step2)
    text = """<b>Вопрос 2 из 3:</b>
Какой район интересует?"""
    await callback.message.edit_text(text, reply_markup=get_demo_realty_step2())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_r2:"))
async def demo_realty_step2(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step3)
    text = """<b>Вопрос 3 из 3:</b>
Способ оплаты?"""
    await callback.message.edit_text(text, reply_markup=get_demo_realty_step3())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_r3:"))
async def demo_realty_step3(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    text = """✅ <b>Сценарий завершён.</b>

Что произошло «под капотом»:
• Лид квалифицирован
• Сегмент сохранён в CRM
• Менеджер получил уведомление

<b>Эффект в реальных проектах:</b>
📈 +37% квалифицированных заявок
⏳ -60% времени на опрос

Хотите так же для своего бизнеса?"""
    await callback.message.edit_text(text, reply_markup=get_demo_final_keyboard())
    await callback.answer()

# DEMO: SCHOOL
@router.callback_query(F.data == "demo:school")
async def demo_school_start(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step1)
    await state.update_data(demo_niche="school")
    text = """🎓 <b>Демо-режим: Онлайн-образование</b>

Вы — потенциальный студент.
Подберем программу.

<b>Вопрос 1 из 3:</b>
Какую цель хотите достичь?"""
    await callback.message.edit_text(text, reply_markup=get_demo_school_step1())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_s1:"))
async def demo_school_step1(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step2)
    text = """<b>Вопрос 2 из 3:</b>
Когда планируете начать?"""
    await callback.message.edit_text(text, reply_markup=get_demo_school_step2())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_s2:"))
async def demo_school_step2(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step3)
    text = """<b>Вопрос 3 из 3:</b>
Формат обучения?"""
    await callback.message.edit_text(text, reply_markup=get_demo_school_step3())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_s3:"))
async def demo_school_step3(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    text = """✅ <b>Сценарий завершён.</b>

Что произошло «под капотом»:
• Сегментация по цели
• Подбор тарифа
• Прогрев к покупке

<b>Эффект в реальных проектах:</b>
📈 +22% к конверсии в оплату
🤖 80% вопросов обработано автоматически

Хотите так же для своего бизнеса?"""
    await callback.message.edit_text(text, reply_markup=get_demo_final_keyboard())
    await callback.answer()

# DEMO: CLINIC
@router.callback_query(F.data == "demo:clinic")
async def demo_clinic_start(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step1)
    await state.update_data(demo_niche="clinic")
    text = """🏥 <b>Демо-режим: Услуги / Клиника</b>

Вы — пациент.
Запишемся на приём.

<b>Вопрос 1 из 3:</b>
Какая услуга нужна?"""
    await callback.message.edit_text(text, reply_markup=get_demo_clinic_step1())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_c1:"))
async def demo_clinic_step1(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step2)
    text = """<b>Вопрос 2 из 3:</b>
Выберите дату:"""
    await callback.message.edit_text(text, reply_markup=get_demo_clinic_step2())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_c2:"))
async def demo_clinic_step2(callback: CallbackQuery, state: FSMContext):
    await state.set_state(DemoStates.step3)
    text = """<b>Вопрос 3 из 3:</b>
Удобное время?"""
    await callback.message.edit_text(text, reply_markup=get_demo_clinic_step3())
    await callback.answer()

@router.callback_query(F.data.startswith("demo_c3:"))
async def demo_clinic_step3(callback: CallbackQuery, state: FSMContext):
    await state.clear()
    text = """✅ <b>Запись создана.</b>

Что произошло «под капотом»:
• Календарь синхронизирован
• Напоминание настроено
• Карта пациента создана

<b>Эффект в реальных проектах:</b>
📉 -30% пропущенных записей
⏰ -70% ручных сообщений

Хотите так же для своего бизнеса?"""
    await callback.message.edit_text(text, reply_markup=get_demo_final_keyboard())
    await callback.answer()

# ============================================================================
# CASES
# ============================================================================

@router.callback_query(F.data == "cases")
async def show_cases(callback: CallbackQuery):
    text = """<b>Реальные результаты внедрений:</b>

🏢 <b>Недвижимость (Москва)</b>
• +37% квалифицированных лидов
• Интеграция с AmoCRM
• Срок запуска: 12 дней

🛍 <b>Telegram-магазин</b>
• Оплата внутри бота (ЮKassa)
• Синхронизация склада (1С)
• Срок запуска: 18 дней

🏥 <b>Клиника (Москва)</b>
• -30% неявок на приём
• Авто-напоминания 24/7
• Срок запуска: 10 дней

Хотите посмотреть все кейсы?"""
    await callback.message.edit_text(text, reply_markup=get_cases_keyboard())
    await callback.answer()

# ============================================================================
# QUESTION TO MANAGER
# ============================================================================

@router.callback_query(F.data == "question")
async def question_start(callback: CallbackQuery, state: FSMContext):
    await state.set_state(QuestionStates.waiting_question)
    text = """Напишите вопрос одним сообщением.

Среднее время ответа: 1–2 часа
(в рабочее время: 9:00–20:00 МСК)"""
    await callback.message.edit_text(text, reply_markup=get_back_to_menu())
    await callback.answer()

@router.message(QuestionStates.waiting_question)
async def question_received(message: Message, state: FSMContext):
    import hashlib
    
    question = message.text
    ticket_id = hashlib.md5(f"{message.from_user.id}{datetime.now()}".encode()).hexdigest()[:8].upper()
    
    await notify_support_request(
        user_id=message.from_user.id,
        username=message.from_user.username,
        first_name=message.from_user.first_name,
        question=question,
        ticket_id=ticket_id
    )
    
    # Умная классификация
    lower_q = question.lower()
    auto_response = None
    
    if any(word in lower_q for word in ["цена", "сколько", "стоимость", "тариф"]):
        auto_response = ("Стоимость зависит от архитектуры. Для точного расчета заполните бриф.",
                        InlineKeyboardMarkup(inline_keyboard=[
                            [InlineKeyboardButton(text="📝 Заполнить бриф", url="https://www.chatbot24.su/brief")]
                        ]))
    elif any(word in lower_q for word in ["срок", "когда", "быстро"]):
        auto_response = ("Средний срок запуска — 10–14 дней. Срочные проекты обсуждаем индивидуально.", None)
    elif any(word in lower_q for word in ["кейс", "пример", "портфолио"]):
        auto_response = ("Посмотрите все кейсы на сайте.",
                        InlineKeyboardMarkup(inline_keyboard=[
                            [InlineKeyboardButton(text="💼 Кейсы", url="https://www.chatbot24.su/cases")]
                        ]))
    
    if auto_response:
        text, kb = auto_response
        await message.answer(text, reply_markup=kb)
    
    text = f"""Вопрос принят в работу.
<b>ID заявки:</b> #{ticket_id}
Менеджер уже уведомлен.
Ожидайте ответ в ближайшее время."""
    
    kb = InlineKeyboardMarkup(inline_keyboard=[
        [InlineKeyboardButton(text="⬅️ В меню", callback_data="main_menu")],
        [InlineKeyboardButton(text="📞 Заказать звонок", callback_data="calc_start")],
    ])
    
    await message.answer(text, reply_markup=kb)
    await state.clear()

# ============================================================================
# ERROR HANDLING & ESCALATION
# ============================================================================

error_counters: Dict[int, int] = {}

@router.message()
async def handle_unknown_message(message: Message, state: FSMContext):
    user_id = message.from_user.id
    current_state = await state.get_state()
    
    if current_state:
        return
    
    # Проверка на спам
    text_lower = message.text.lower() if message.text else ""
    spam_words = ["казино", "крипта", "crypto", "adult", "xxx", "порно"]
    if any(word in text_lower for word in spam_words):
        return
    
    # Проверка на количество ссылок
    if message.text and message.text.count("http") > 2:
        await message.answer(
            "Предложения по сотрудничеству отправляйте через раздел меню.",
            reply_markup=get_main_menu()
        )
        return
    
    # Эскалация
    error_counters[user_id] = error_counters.get(user_id, 0) + 1
    
    if error_counters[user_id] == 1:
        await message.answer(
            """Чтобы я не ошибся, выберите пункт в меню.
Это ускорит обработку вашего запроса.""",
            reply_markup=get_error_keyboard(attempt=1)
        )
    else:
        await message.answer(
            """Кажется, у вас нестандартный запрос.
Подключу менеджера для помощи.""",
            reply_markup=get_error_keyboard(attempt=2)
        )
        
        await notify_escalation(
            user_id=message.from_user.id,
            username=message.from_user.username,
            first_name=message.from_user.first_name,
            message_text=message.text or "[не текст]"
        )
        
        error_counters[user_id] = 0

@router.callback_query(F.data == "escalate")
async def escalate_callback(callback: CallbackQuery):
    await notify_escalation(
        user_id=callback.from_user.id,
        username=callback.from_user.username,
        first_name=callback.from_user.first_name,
        message_text="Пользователь нажал кнопку 'Позвать менеджера'"
    )
    
    await callback.message.edit_text(
        "👨‍💼 Менеджер уведомлен и свяжется с вами в ближайшее время.",
        reply_markup=get_back_to_menu()
    )
    await callback.answer()

# ============================================================================
# MAIN
# ============================================================================

async def main():
    dp.include_router(router)
    logger.info("Starting bot...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())
