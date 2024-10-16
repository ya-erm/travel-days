import { addMessages } from 'svelte-i18n';
import type { Dictionary } from './messages';

export const ruDict: Dictionary = {
  'app.title': 'Travel Days',
  // Common
  'common.back': 'Назад',
  'common.select': 'Выбрать',
  'common.accept': 'Принять',
  'common.available_variants': 'Доступные варианты',
  'common.optional': 'опционально',
  'common.loading': 'Загрузка...',
  'common.synchronizing': 'Синхронизация',
  'common.show_more': 'Показать ещё',
  'common.sorting': 'Сортировка',
  'common.sort_by': 'Поле для сортировки',
  'common.sort_direction': 'Направление сортировки',
  'common.ascending': 'По возрастанию',
  'common.descending': 'По убыванию',
  'common.grouping': 'Группировка',
  'common.no_items': 'Здесь пока ничего нет',
  'common.nothing_found': 'Ничего не найдено',
  'common.create': 'Создать',
  'common.save': 'Сохранить',
  'common.add': 'Добавить',
  'common.save_changes_failure': 'Не удалось сохранить изменения',
  'common.save_changes_success': 'Изменения сохранены',
  'common.search': 'Поиск',
  'common.clear': 'Очистить',
  'common.cancel': 'Отмена',
  'common.delete': 'Удалить',
  'common.ok': 'OK',
  'common.continue': 'Продолжить',
  'common.reset': 'Сбросить',
  'common.go_back_to_list': 'Вернуться назад к списку',
  'common.count': '{count} шт.',
  'common.show': 'Показать',
  'common.hide': 'Скрыть',
  'common.data_problems':
    '{count, plural, one {Обнаружена # ошибка} few {Обнаружено # ошибки} other {Обнаружено # ошибок}} при инициализации данных',
  'common.select_all': 'Выбрать все',
  // Timezones
  'timezones.select_time_zone': 'Выберите часовой пояс',
  'timezones.current_time_zone': 'Текущий часовой пояс',
  'timezones.favorite_time_zones': 'Избранные часовые пояса',
  'timezones.all_time_zones': 'Все часовые пояса',
  'timezones.timezone_added_to_favorites': 'Часовой пояс добавлен в избранные',
  'timezones.timezone_removed_from_favorites': 'Часовой пояс удалён из избранных',
  // Tags
  'tags.add_modal_header': 'Добавить тег',
  'tags.edit_modal_header': 'Редактировать тег',
  'tags.title': 'Название',
  'tags.delete_tag': 'Удалить тег',
  'tags.add_tag_failure': 'Не удалось добавить тег',
  'tags.edit_tag_failure': 'Не удалось изменить тег',
  'tags.delete_tag_failure': 'Не удалось удалить тег',
  // Language
  'language.select_language': 'Выберите язык',
  // Auth
  'auth.login.title': 'Вход',
  'auth.login': 'Логин',
  'auth.password': 'Пароль',
  'auth.sign_in': 'Войти',
  'auth.incorrect_login_or_password': 'Неверный логин или пароль',
  'auth.incorrect_old_password': 'Неверный старый пароль',
  'auth.failed_to_login': 'Не удалось войти',
  'auth.register.title': 'Регистрация',
  'auth.name': 'Имя',
  'auth.phone': 'Телефон',
  'auth.old_password': 'Старый пароль',
  'auth.new_password': 'Новый пароль',
  'auth.repeat_password': 'Повторите пароль',
  'auth.passwords_must_be_same': 'Пароли должны совпадать',
  'auth.register': 'Зарегистрироваться',
  'auth.user_already_exists': 'Пользователь уже существует',
  'auth.registration_success': 'Регистрация прошла успешно',
  'auth.registration_failure': 'Не удалось зарегистрироваться',
  'auth.logout.title': 'Выход',
  'auth.logging_out': 'Выходим из системы...',
  'auth.sign_out': 'Выйти',
  'auth.profile': 'Профиль',
  'auth.logged_in_as': 'Вы зашли как {name}!',
  'auth.not_logged_in': 'Вы не авторизованы',
  'auth.continue_as_guest': 'Войти как гость',
  'auth.logged_in_as_guest_info': 'Вы авторизованы как гость. Синхронизация отключена.',
  'auth.guest': 'Гость',
  // Settings
  'settings.title': 'Настройки',
  'settings.language': 'Язык',
  'settings.select_language': 'Выберите язык',
  'settings.common': 'Общее',
  'settings.darkMode': 'Тёмная тема',
  'settings.theme': 'Оформление',
  'settings.theme.light': 'Светлое',
  'settings.theme.dark': 'Тёмное',
  'settings.theme.system': 'Как в системе',
  'settings.import_export': 'Импорт / Экспорт',
  'settings.profile': 'Профиль',
  'settings.profile.change_name': 'Изменить имя',
  'settings.profile.change_name_failure': 'Не удалось изменить имя',
  'settings.profile.change_login': 'Изменить логин',
  'settings.profile.change_login_failure': 'Не удалось изменить логин',
  'settings.profile.change_password': 'Изменить пароль',
  'settings.profile.change_password_success': 'Пароль успешно изменён',
  'settings.profile.change_password_failure': 'Не удалось изменить пароль',
  'settings.profile.change_workspace': 'Выберите пространство',
  'settings.profile.change_workspace_failure': 'Не удалось выбрать рабочее пространство',
  'settings.profile.logout': 'Выйти из системы',
  'settings.collaboration': 'Совместная работа',
  'settings.collaboration.workspace': 'Рабочее пространство',
  'settings.collaboration.workspaces': 'Рабочие пространства',
  'settings.collaboration.invites': 'Приглашения',
  'settings.collaboration.blocklist': 'Чёрный список',
  'settings.encryption': 'Шифрование',
  'settings.debug_tools': 'Инструменты отладки',
  'settings.logs': 'Журнал логов',
  'settings.logs.filters': 'Фильтры',
  'settings.logs.show_filters': 'Показать фильтры',
  'settings.logs.hide_filters': 'Скрыть фильтры',
  'settings.report_problem': 'Сообщить о проблеме',
  'settings.version': 'Версия: {version}',
  'settings.uikit': 'UI Kit',
};

addMessages('ru-RU', ruDict);
