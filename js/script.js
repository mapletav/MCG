// 初始状态
const commandState = {
    command: '/give',
    target: '@p',
    itemId: '',
    count: 1,
    nameEnabled: false,
    loreEnabled: false,
    enchantmentEnabled: false,
    attributeEnabled: false,
    nameParts: [
        { 
            text: '', 
            color: '', 
            styles: { 
                underlined: false,
                strikethrough: false,
                obfuscated: false,
                italic: false
            }
        }
    ],
    loreLines: [
        {
            parts: [
                { 
                    text: '', 
                    color: '', 
                    styles: {
                        underlined: false,
                        strikethrough: false,
                        obfuscated: false,
                        italic: false
                    }
                }
            ]
        }
    ],
    enchantments: [],
    attributes: []
};

// 属性修饰符（attribute_modifiers）类型列表
const attributeTypes = [
    { name: "护甲值（armor）", value: "armor", description: "正面 - 护甲值与盔甲韧性共同作用，减少生物受到的伤害" },
    { name: "盔甲韧性（armor_toughness）", value: "armor_toughness", description: "正面 - 护甲值与盔甲韧性共同作用，减少生物受到的伤害" },
    { name: "攻击伤害（attack_damage）", value: "attack_damage", description: "正面 - 生物的近战攻击伤害" },
    { name: "击退（attack_knockback）", value: "attack_knockback", description: "正面 - 生物的攻击造成的击退强度的增量" },
    { name: "攻击速度（attack_speed）", value: "attack_speed", description: "正面 - 玩家的攻击速度" },
    { name: "方块破坏速度（block_break_speed）", value: "block_break_speed", description: "正面 - 玩家破坏方块的速度乘数" },
    { name: "方块交互距离（block_interaction_range）", value: "block_interaction_range", description: "正面 - 玩家可以与方块交互的距离" },
    { name: "着火时间（burning_time）", value: "burning_time", description: "负面 - 设置生物剩余着火时间效果的乘数" },
    { name: "镜头距离（camera_distance）", value: "camera_distance", description: "中性 - 设置第三人称视角下摄像机与玩家或被旁观实体的距离" },
    { name: "实体交互距离（entity_interaction_range）", value: "entity_interaction_range", description: "正面 - 玩家可以与实体交互的距离" },
    { name: "爆炸击退抗性（explosion_knockback_resistance）", value: "explosion_knockback_resistance", description: "正面 - 生物对爆炸击退的抵抗强度" },
    { name: "摔落伤害倍数（fall_damage_multiplier）", value: "fall_damage_multiplier", description: "负面 - 生物受到的摔落伤害的乘数" },
    { name: "飞行速度（flying_speed）", value: "flying_speed", description: "正面 - 生物的飞行移动的速度" },
    { name: "生物跟随距离（follow_range）", value: "follow_range", description: "正面 - 生物AI可追踪和寻路的最大范围" },
    { name: "重力（gravity）", value: "gravity", description: "中性 - 生物在垂直方向上持续受到的向下加速的加速度" },
    { name: "跳跃力度（jump_strength）", value: "jump_strength", description: "正面 - 生物进行跳跃时获得的垂直速度" },
    { name: "击退抗性（knockback_resistance）", value: "knockback_resistance", description: "正面 - 生物对击退的抵抗强度" },
    { name: "幸运值（luck）", value: "luck", description: "正面 - 高幸运值使玩家获得更好的战利品" },
    { name: "最大伤害吸收值（max_absorption）", value: "max_absorption", description: "正面 - 生物的最大伤害吸收值" },
    { name: "最大生命值（max_health）", value: "max_health", description: "正面 - 生物的最大生命值" },
    { name: "挖掘效率（mining_efficiency）", value: "mining_efficiency", description: "正面 - 玩家的挖掘速度增量" },
    { name: "移动效率（movement_efficiency）", value: "movement_efficiency", description: "正面 - 生物对脚下方块影响移动效果的抵抗" },
    { name: "移动速度（movement_speed）", value: "movement_speed", description: "正面 - 生物的地面移动速度" },
    { name: "额外氧气（oxygen_bonus）", value: "oxygen_bonus", description: "正面 - 生物抵抗氧气下降的能力" },
    { name: "安全摔落高度（safe_fall_distance）", value: "safe_fall_distance", description: "正面 - 生物不受摔落伤害的高度" },
    { name: "尺寸（scale）", value: "scale", description: "中性 - 生物的尺寸乘数" },
    { name: "僵尸增援（spawn_reinforcements）", value: "spawn_reinforcements", description: "正面 - 僵尸生成僵尸增援的能力" },
    { name: "潜行速度（sneaking_speed）", value: "sneaking_speed", description: "正面 - 玩家的潜行时的速度乘数" },
    { name: "最大行走高度（step_height）", value: "step_height", description: "正面 - 生物不需要跳跃就可以走上的最大高度" },
    { name: "水下挖掘速度（submerged_mining_speed）", value: "submerged_mining_speed", description: "正面 - 玩家浸没在水中时的挖掘速度乘数" },
    { name: "横扫伤害比率（sweeping_damage_ratio）", value: "sweeping_damage_ratio", description: "正面 - 玩家的横扫伤害与近战伤害的比例" },
    { name: "生物引诱范围（tempt_range）", value: "tempt_range", description: "正面 - 生物能被玩家引诱的最大距离" },
    { name: "水中移动效率（water_movement_efficiency）", value: "water_movement_efficiency", description: "正面 - 生物对水影响移动效果的抵抗" },
    { name: "路径点传输距离（waypoint_transmit_range）", value: "waypoint_transmit_range", description: "中性 - 设置玩家路径点传输距离，用于定位栏" },
    { name: "路径点接收距离（waypoint_receive_range）", value: "waypoint_receive_range", description: "中性 - 设置玩家路径点接收距离，用于定位栏" }
];

// 属性修饰符（attribute_modifiers）操作类型列表
const operations = [
    { name: "增量操作（add_value，Op0）", value: "add_value" },
    { name: "倍率操作（add_multiplied_base，Op1）", value: "add_multiplied_base" },
    { name: "最终倍乘操作（add_multiplied_total，Op2）", value: "add_multiplied_total" }
];

// 属性修饰符（attribute_modifiers）装备槽位列表
const slots = [
    { name: "1-全部槽位（any）", value: "any" },
    { name: "2-双手槽位（hand）", value: "hand" },
    { name: "2.1-主手（mainhand）", value: "mainhand" },
    { name: "2.2-副手（offhand）", value: "offhand" },
    { name: "3-护甲槽位（armor）", value: "armor" },
    { name: "3.1-头盔（head）", value: "head" },
    { name: "3.2-胸甲（chest）", value: "chest" },
    { name: "3.3-护腿（legs）", value: "legs" },
    { name: "3.4-靴子（feet）", value: "feet" },
    { name: "4-身体槽位（body）", value: "body" }
];

// 属性修饰符（attribute_modifiers）显示类型列表
const displayTypes = [
    { name: "默认显示（研究中...暂时勿用）", value: "default" },
    { name: "隐藏（研究中...暂时勿用）", value: "hidden" },
    { name: "自定义显示（研究中...暂时勿用）", value: "override" }
];

// DOM 元素
// DOM 元素/命令预览
const commandPreview = document.getElementById('commandPreview');
// DOM 元素/命令按钮
const commandBtns = document.querySelectorAll('.command-btn');
// DOM 元素/目标按钮
const targetBtns = document.querySelectorAll('.target-btn');
// DOM 元素/自定义目标
const customTarget = document.getElementById('customTarget');
// DOM 元素/物品ID
const itemId = document.getElementById('itemId');
// DOM 元素/物品数量
const itemCount = document.getElementById('itemCount');
// DOM 元素/高级选项/自定义物品名称
// DOM 元素/高级选项/自定义物品名称/开关
const nameToggle = document.getElementById('nameToggle');
const nameSection = document.getElementById('nameSection');
const loreToggle = document.getElementById('loreToggle');
const loreSection = document.getElementById('loreSection');
const enchantmentToggle = document.getElementById('enchantmentToggle');
const enchantmentSection = document.getElementById('enchantmentSection');
const attributeToggle = document.getElementById('attributeToggle');
const attributeSection = document.getElementById('attributeSection');

// 名称部分
const namePartsContainer = document.getElementById('nameParts');
const addNamePartBtn = document.getElementById('addNamePart');

// 描述部分
const loreLinesContainer = document.getElementById('loreLines');
const addLoreLineBtn = document.getElementById('addLoreLine');

// 附魔部分
const enchantmentPartsContainer = document.getElementById('enchantmentParts');
const addEnchantmentPartBtn = document.getElementById('addEnchantmentPart');
const showEnchantmentRefBtn = document.getElementById('showEnchantmentRef');
const enchantmentRef = document.getElementById('enchantmentRef');

// 属性修饰符部分
const attributeModifiersContainer = document.getElementById('attributeModifiers');
const addAttributeModifierBtn = document.getElementById('addAttributeModifier');

// 其他按钮
const copyButton = document.getElementById('copyButton');
const resetButton = document.getElementById('resetButton');

// 初始化
function init() {
    setupEventListeners();
    updateCommandPreview();
}

// 设置事件监听器
function setupEventListeners() {
    // 命令选择按钮
    commandBtns.forEach(btn => {
        if (!btn.classList.contains('cursor-not-allowed')) {
            btn.addEventListener('click', () => {
                commandBtns.forEach(b => {
                    b.classList.remove('bg-primary', 'text-white');
                    b.classList.add('bg-gray-300', 'text-gray-500');
                });
                btn.classList.remove('bg-gray-300', 'text-gray-500');
                btn.classList.add('bg-primary', 'text-white');
                commandState.command = btn.dataset.command;
                updateCommandPreview();
            });
        }
    });

    // 目标选择按钮
    targetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            targetBtns.forEach(b => {
                b.classList.remove('bg-primary/10', 'text-primary', 'border-primary');
                b.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
            });
            btn.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
            btn.classList.add('bg-primary/10', 'text-primary', 'border-primary');
            commandState.target = btn.dataset.target;
            customTarget.value = '';
            updateCommandPreview();
        });
    });

    // 自定义目标输入
    customTarget.addEventListener('input', () => {
        if (customTarget.value.trim()) {
            targetBtns.forEach(b => {
                b.classList.remove('bg-primary/10', 'text-primary', 'border-primary');
                b.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
            });
            commandState.target = customTarget.value.trim();
            updateCommandPreview();
        } else {
            // 如果清空了自定义目标，恢复默认选择
            const defaultTargetBtn = document.querySelector('.target-btn[data-target="@p"]');
            if (defaultTargetBtn) {
                defaultTargetBtn.click();
            }
        }
    });

    // 物品ID输入
    itemId.addEventListener('input', () => {
        commandState.itemId = itemId.value.trim();
        updateCommandPreview();
    });

    // 物品数量输入
    itemCount.addEventListener('input', () => {
        commandState.count = Math.min(64, Math.max(1, parseInt(itemCount.value) || 1));
        itemCount.value = commandState.count;
        updateCommandPreview();
    });

    // 高级选项开关
    nameToggle.addEventListener('change', () => {
        commandState.nameEnabled = nameToggle.checked;
        toggleSection(nameSection, nameToggle.checked);
        updateCommandPreview();
    });

    loreToggle.addEventListener('change', () => {
        commandState.loreEnabled = loreToggle.checked;
        toggleSection(loreSection, loreToggle.checked);
        updateCommandPreview();
    });

    enchantmentToggle.addEventListener('change', () => {
        commandState.enchantmentEnabled = enchantmentToggle.checked;
        toggleSection(enchantmentSection, enchantmentToggle.checked);
        updateCommandPreview();
    });

    attributeToggle.addEventListener('change', () => {
        commandState.attributeEnabled = attributeToggle.checked;
        toggleSection(attributeSection, attributeToggle.checked);
        updateCommandPreview();
    });

    // 添加名称片段
    addNamePartBtn.addEventListener('click', () => {
        addNamePart();
        updateRemoveButtonsVisibility();
        updateCommandPreview();
    });

    // 添加描述行
    addLoreLineBtn.addEventListener('click', () => {
        addLoreLine();
        updateRemoveButtonsVisibility();
        updateCommandPreview();
    });

    // 添加附魔
    addEnchantmentPartBtn.addEventListener('click', () => {
        addEnchantment();
        updateRemoveButtonsVisibility();
        updateCommandPreview();
    });

    // 显示/隐藏附魔参考
    showEnchantmentRefBtn.addEventListener('click', () => {
        enchantmentRef.classList.toggle('hidden');
    });

    // 添加属性修饰符
    addAttributeModifierBtn.addEventListener('click', () => {
        addAttributeModifier();
        updateRemoveButtonsVisibility();
        updateCommandPreview();
    });

    // 复制命令按钮
    copyButton.addEventListener('click', () => {
        navigator.clipboard.writeText(commandPreview.textContent).then(() => {
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fa fa-check mr-2"></i>已复制';
            setTimeout(() => {
                copyButton.innerHTML = originalText;
            }, 2000);
        });
    });

    // 重置按钮
    resetButton.addEventListener('click', resetForm);

    // 初始化事件委托，处理动态添加的元素
    setupEventDelegation();
}

// 设置事件委托
function setupEventDelegation() {
    // 删除名称片段
    namePartsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-part')) {
            const part = e.target.closest('.name-part');
            if (namePartsContainer.children.length > 1) {
                part.remove();
                updateRemoveButtonsVisibility();
                updateCommandPreview();
            }
        }
    });

    // 颜色按钮点击
    document.addEventListener('click', (e) => {
        if (e.target.closest('.color-btn')) {
            const colorBtn = e.target.closest('.color-btn');
            const colorBtns = colorBtn.parentElement.querySelectorAll('.color-btn');
            
            // 移除同组其他按钮的active类
            colorBtns.forEach(btn => btn.classList.remove('active'));
            
            // 给当前点击的按钮添加active类
            colorBtn.classList.add('active');
            
            // 清空自定义颜色输入
            const customColorInput = colorBtn.closest('.text-part-card, .lore-part').querySelector('.custom-color');
            if (customColorInput) {
                customColorInput.value = '';
            }
            
            updateCommandPreview();
        }
    });

    // 文本样式复选框变化
    document.addEventListener('change', (e) => {
        if (e.target.classList.contains('style-checkbox')) {
            updateCommandPreview();
        }
    });

    // 文本输入变化
    document.addEventListener('input', (e) => {
        if (e.target.classList.contains('name-text') || e.target.classList.contains('lore-text')) {
            updateCommandPreview();
        }
        
        // 自定义颜色输入
        if (e.target.classList.contains('custom-color')) {
            const colorInput = e.target;
            const colorBtns = colorInput.closest('.text-part-card, .lore-part').querySelectorAll('.color-btn');
            
            // 移除所有颜色按钮的active类
            colorBtns.forEach(btn => btn.classList.remove('active'));
            
            updateCommandPreview();
        }
    });

    // 删除描述行
    loreLinesContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-lore-line')) {
            const line = e.target.closest('.lore-line');
            if (loreLinesContainer.children.length > 1) {
                line.remove();
                updateRemoveButtonsVisibility();
                updateCommandPreview();
            }
        }
    });

    // 添加描述行内片段
    loreLinesContainer.addEventListener('click', (e) => {
        if (e.target.closest('.add-lore-part')) {
            const line = e.target.closest('.lore-line');
            const partsContainer = line.querySelector('.lore-parts');
            addLorePart(partsContainer);
            updateRemoveButtonsVisibility();
            updateCommandPreview();
        }
    });

    // 删除描述片段
    loreLinesContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-lore-part')) {
            const part = e.target.closest('.lore-part');
            const partsContainer = part.parentElement;
            if (partsContainer.children.length > 1) {
                part.remove();
                updateRemoveButtonsVisibility();
                updateCommandPreview();
            }
        }
    });

    // 删除附魔
    enchantmentPartsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-enchantment')) {
            const enchantment = e.target.closest('.enchantment-card');
            enchantment.remove();
            updateCommandPreview();
        }
    });

    // 附魔输入变化
    enchantmentPartsContainer.addEventListener('input', (e) => {
        if (e.target.classList.contains('enchantment-id') || e.target.classList.contains('enchantment-level')) {
            updateCommandPreview();
        }
    });

    // 删除属性修饰符
    attributeModifiersContainer.addEventListener('click', (e) => {
        if (e.target.closest('.remove-attribute')) {
            const attribute = e.target.closest('.attribute-card');
            attribute.remove();
            updateCommandPreview();
        }
    });

    // 属性修饰符输入变化
    attributeModifiersContainer.addEventListener('input', (e) => {
        if (e.target.closest('.attribute-card')) {
            updateCommandPreview();
        }
    });

    // 属性修饰符选择变化
    attributeModifiersContainer.addEventListener('change', (e) => {
        if (e.target.closest('.attribute-card')) {
            // 处理显示类型变化
            if (e.target.classList.contains('display-type')) {
                const attributeCard = e.target.closest('.attribute-card');
                const displayValueContainer = attributeCard.querySelector('.display-value-container');
                if (e.target.value === 'override') {
                    displayValueContainer.classList.remove('hidden');
                } else {
                    displayValueContainer.classList.add('hidden');
                }
            }
            updateCommandPreview();
        }
    });
}

// 切换高级选项区域的启用状态
function toggleSection(section, enabled) {
    if (enabled) {
        section.classList.remove('opacity-50', 'pointer-events-none');
    } else {
        section.classList.add('opacity-50', 'pointer-events-none');
    }
}

// 更新删除按钮的可见性
function updateRemoveButtonsVisibility() {
    // 名称片段删除按钮
    const nameParts = namePartsContainer.querySelectorAll('.name-part');
    nameParts.forEach((part, index) => {
        const removeBtn = part.querySelector('.remove-part');
        removeBtn.classList.toggle('hidden', nameParts.length <= 1);
        part.querySelector('.text-gray-700.text-sm.font-medium').textContent = `文本片段 #${index + 1}`;
    });

    // 描述行删除按钮
    const loreLines = loreLinesContainer.querySelectorAll('.lore-line');
    loreLines.forEach((line, index) => {
        const removeBtn = line.querySelector('.remove-lore-line');
        removeBtn.classList.toggle('hidden', loreLines.length <= 1);
        line.querySelector('.text-gray-700.font-medium').textContent = `描述行 #${index + 1}`;
        
        // 描述行内片段删除按钮
        const loreParts = line.querySelectorAll('.lore-part');
        loreParts.forEach((part, pIndex) => {
            const pRemoveBtn = part.querySelector('.remove-lore-part');
            pRemoveBtn.classList.toggle('hidden', loreParts.length <= 1);
            part.querySelector('.text-gray-700.text-sm.font-medium').textContent = `文本片段 #${pIndex + 1}`;
        });
    });
}

// 添加名称片段
function addNamePart() {
    const newPart = document.createElement('div');
    newPart.className = 'name-part text-part-card';
    newPart.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <span class="text-gray-700 text-sm font-medium">文本片段 #${namePartsContainer.children.length + 1}</span>
            <button class="remove-part btn-secondary px-2 py-1 text-xs">
                <i class="fa fa-times mr-1"></i>删除
            </button>
        </div>
        
        <div class="mb-2">
            <input type="text" class="input-field name-text text-sm" placeholder="输入文本...">
        </div>
        
        <!-- 文本样式设置 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">文本颜色</label>
                <div class="flex flex-wrap gap-1.5 mb-2">
                    <button class="color-btn w-6 h-6 rounded-full bg-black border-2 border-transparent" data-color="black"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-yellow-500 border-2 border-transparent" data-color="gold"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-gray-500 border-2 border-transparent" data-color="gray"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-blue-500 border-2 border-transparent" data-color="blue"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-green-500 border-2 border-transparent" data-color="green"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-cyan-500 border-2 border-transparent" data-color="aqua"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-red-500 border-2 border-transparent" data-color="red"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-yellow-400 border-2 border-transparent" data-color="yellow"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-white border-2 border-gray-300" data-color="white"></button>
                </div>
                <div class="flex">
                    <input type="text" class="input-field custom-color text-sm" placeholder="HEX代码，例如: #FF5555">
                </div>
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">文本样式</label>
                <div class="space-y-1">
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">下划线</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="underlined">
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">删除线</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="strikethrough">
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">乱码</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="obfuscated">
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">取消斜体</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="italic">
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
            </div>
        </div>
    `;
    namePartsContainer.appendChild(newPart);
}

// 添加描述行
function addLoreLine() {
    const newLine = document.createElement('div');
    newLine.className = 'lore-line lore-line-card';
    newLine.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            <span class="text-gray-700 font-medium">描述行 #${loreLinesContainer.children.length + 1}</span>
            <button class="remove-lore-line btn-secondary px-3 py-1 text-sm">
                <i class="fa fa-times mr-1"></i>删除行
            </button>
        </div>
        
        <div class="lore-parts">
            <!-- 行内文本片段1 -->
            <div class="lore-part text-part-card">
                <div class="flex justify-between items-center mb-2">
                    <span class="text-gray-700 text-sm font-medium">文本片段 #1</span>
                    <button class="remove-lore-part btn-secondary px-2 py-1 text-xs">
                        <i class="fa fa-times mr-1"></i>删除
                    </button>
                </div>
                
                <div class="mb-2">
                    <input type="text" class="input-field lore-text text-sm" placeholder="输入文本...">
                </div>
                
                <!-- 文本样式设置 -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                        <label class="block text-gray-700 text-sm font-medium mb-1">文本颜色</label>
                        <div class="flex flex-wrap gap-1.5 mb-2">
                            <button class="color-btn w-6 h-6 rounded-full bg-black border-2 border-transparent" data-color="black"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-yellow-500 border-2 border-transparent" data-color="gold"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-gray-500 border-2 border-transparent" data-color="gray"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-blue-500 border-2 border-transparent" data-color="blue"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-green-500 border-2 border-transparent" data-color="green"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-cyan-500 border-2 border-transparent" data-color="aqua"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-red-500 border-2 border-transparent" data-color="red"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-yellow-400 border-2 border-transparent" data-color="yellow"></button>
                            <button class="color-btn w-6 h-6 rounded-full bg-white border-2 border-gray-300" data-color="white"></button>
                        </div>
                        <div class="flex">
                            <input type="text" class="input-field custom-color text-sm" placeholder="HEX代码，例如: #FF5555">
                        </div>
                    </div>
                    
                    <div>
                        <label class="block text-gray-700 text-sm font-medium mb-1">文本样式</label>
                        <div class="space-y-1">
                            <label class="flex items-center justify-between">
                                <span class="text-gray-700 text-sm">下划线</span>
                                <label class="switch">
                                    <input type="checkbox" class="style-checkbox" data-style="underlined">
                                    <span class="slider"></span>
                                </label>
                            </label>
                            <label class="flex items-center justify-between">
                                <span class="text-gray-700 text-sm">删除线</span>
                                <label class="switch">
                                    <input type="checkbox" class="style-checkbox" data-style="strikethrough">
                                    <span class="slider"></span>
                                </label>
                            </label>
                            <label class="flex items-center justify-between">
                                <span class="text-gray-700 text-sm">乱码</span>
                                <label class="switch">
                                    <input type="checkbox" class="style-checkbox" data-style="obfuscated">
                                    <span class="slider"></span>
                                </label>
                            </label>
                            <label class="flex items-center justify-between">
                                <span class="text-gray-700 text-sm">取消斜体</span>
                                <label class="switch">
                                    <input type="checkbox" class="style-checkbox" data-style="italic">
                                    <span class="slider"></span>
                                </label>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="flex justify-between mt-3">
            <button class="add-lore-part btn-secondary text-sm">
                <i class="fa fa-plus mr-1"></i>添加文本片段
            </button>
        </div>
    `;
    loreLinesContainer.appendChild(newLine);
}

// 在指定描述行添加文本片段
function addLorePart(partsContainer) {
    const partCount = partsContainer.children.length;
    const newPart = document.createElement('div');
    newPart.className = 'lore-part text-part-card';
    newPart.innerHTML = `
        <div class="flex justify-between items-center mb-2">
            <span class="text-gray-700 text-sm font-medium">文本片段 #${partCount + 1}</span>
            <button class="remove-lore-part btn-secondary px-2 py-1 text-xs">
                <i class="fa fa-times mr-1"></i>删除
            </button>
        </div>
        
        <div class="mb-2">
            <input type="text" class="input-field lore-text text-sm" placeholder="输入文本...">
        </div>
        
        <!-- 文本样式设置 -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">文本颜色</label>
                <div class="flex flex-wrap gap-1.5 mb-2">
                    <button class="color-btn w-6 h-6 rounded-full bg-black border-2 border-transparent" data-color="black"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-yellow-500 border-2 border-transparent" data-color="gold"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-gray-500 border-2 border-transparent" data-color="gray"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-blue-500 border-2 border-transparent" data-color="blue"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-green-500 border-2 border-transparent" data-color="green"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-cyan-500 border-2 border-transparent" data-color="aqua"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-red-500 border-2 border-transparent" data-color="red"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-yellow-400 border-2 border-transparent" data-color="yellow"></button>
                    <button class="color-btn w-6 h-6 rounded-full bg-white border-2 border-gray-300" data-color="white"></button>
                </div>
                <div class="flex">
                    <input type="text" class="input-field custom-color text-sm" placeholder="HEX代码，例如: #FF5555">
                </div>
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">文本样式</label>
                <div class="space-y-1">
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">下划线</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="underlined">
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">删除线</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="strikethrough">
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">乱码</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="obfuscated">
                            <span class="slider"></span>
                        </label>
                    </label>
                    <label class="flex items-center justify-between">
                        <span class="text-gray-700 text-sm">取消斜体</span>
                        <label class="switch">
                            <input type="checkbox" class="style-checkbox" data-style="italic">
                            <span class="slider"></span>
                        </label>
                    </label>
                </div>
            </div>
        </div>
    `;
    partsContainer.appendChild(newPart);
}

// 添加附魔
function addEnchantment() {
    const newEnchantment = document.createElement('div');
    newEnchantment.className = 'enchantment-card';
    newEnchantment.innerHTML = `
        <div class="flex-1 w-full">
            <div class="flex justify-between items-center mb-3">
                <span class="text-gray-700 font-medium">附魔 #${enchantmentPartsContainer.children.length + 1}</span>
                <button class="remove-enchantment btn-secondary px-3 py-1 text-sm">
                    <i class="fa fa-times mr-1"></i>删除
                </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label class="block text-gray-700 text-sm font-medium mb-1">附魔ID</label>
                    <input type="text" class="input-field enchantment-id text-sm" placeholder="例如: minecraft:sharpness">
                </div>
                
                <div>
                    <label class="block text-gray-700 text-sm font-medium mb-1">等级</label>
                    <input type="number" class="input-field enchantment-level text-sm" min="1" value="1">
                </div>
            </div>
        </div>
    `;
    enchantmentPartsContainer.appendChild(newEnchantment);
}

// 添加属性修饰符
function addAttributeModifier() {
    const newAttribute = document.createElement('div');
    newAttribute.className = 'attribute-card';
    
    // 构建属性类型选项HTML
    let attributeOptions = '';
    attributeTypes.forEach(attr => {
        attributeOptions += `<option value="${attr.value}" title="${attr.description}">${attr.name}</option>`;
    });
    
    // 构建操作选项HTML
    let operationOptions = '';
    operations.forEach(op => {
        operationOptions += `<option value="${op.value}">${op.name}</option>`;
    });
    
    // 构建槽位选项HTML
    let slotOptions = '';
    slots.forEach(slot => {
        slotOptions += `<option value="${slot.value}">${slot.name}</option>`;
    });
    
    // 构建显示类型选项HTML
    let displayTypeOptions = '';
    displayTypes.forEach(display => {
        displayTypeOptions += `<option value="${display.value}">${display.name}</option>`;
    });
    
    newAttribute.innerHTML = `
        <div class="flex justify-between items-center mb-3">
            <span class="text-gray-700 font-medium">属性修饰符 #${attributeModifiersContainer.children.length + 1}</span>
            <button class="remove-attribute btn-secondary px-3 py-1 text-sm">
                <i class="fa fa-times mr-1"></i>删除
            </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">属性类型 <span class="text-red-500">*</span></label>
                <select class="input-field attribute-type text-sm">
                    <option value="">请选择属性类型</option>
                    ${attributeOptions}
                </select>
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">修饰符ID（代码必显但可不填）<span class="text-red-500">*</span></label>
                <input type="text" class="input-field attribute-id text-sm" placeholder="不同修饰符有不同的修饰符ID（甚至没有），可在WIKI自行查询">
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">运算模式 <span class="text-red-500">*</span></label>
                <select class="input-field attribute-operation text-sm">
                    <option value="">请选择运算模式</option>
                    ${operationOptions}
                </select>
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">数值 <span class="text-red-500">*</span></label>
                <input type="number" step="any" class="input-field attribute-amount text-sm" placeholder="例如: 1">
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">装备槽位组</label>
                <select class="input-field attribute-slot text-sm">
                    <option value="">0-不限制（可视为any）</option>
                    ${slotOptions}
                </select>
            </div>
            
            <div>
                <label class="block text-gray-700 text-sm font-medium mb-1">显示方式（研究中...暂时勿用）</label>
                <select class="input-field display-type text-sm">
                    ${displayTypeOptions}
                </select>
            </div>
            
            <div class="display-value-container hidden md:col-span-2">
                <label class="block text-gray-700 text-sm font-medium mb-1">自定义显示文本（研究中...暂时勿用）</label>
                <input type="text" class="input-field display-value text-sm" placeholder="研究中...暂时勿用">
            </div>
        </div>
    `;
    attributeModifiersContainer.appendChild(newAttribute);
}

// ————————————————————————————————————————————————————————————————————————————————
// 命令生成、实时预览（核心部分）
// ————————————————————————————————————————————————————————————————————————————————

// 构建文本组件
function buildTextComponent(part) {
    const component = { text: part.text };    
    if (part.color) {
        component.color = part.color;
    }    
    if (part.styles.underlined) {
        component.underlined = true;
    }  
    if (part.styles.strikethrough) {
        component.strikethrough = true;
    }   
    if (part.styles.obfuscated) {
        component.obfuscated = true;
    }
    if (part.styles.italic) {
        component.italic = false;
    }
    return component;
}

// 命令生成、实时预览
function updateCommandPreview() {
    let command = `${commandState.command} ${commandState.target}`;

    // 添加物品ID和数据组件
    if (commandState.itemId) {
        let itemPart = commandState.itemId;
        const nbtTags = [];

        // 命令生成/自定义名称（minecraft:custom_name）
        if (commandState.nameEnabled) {
            const validNameParts = Array.from(namePartsContainer.querySelectorAll('.name-part'))
                .map((part) => {
                    const text = part.querySelector('.name-text').value.trim();
                    if (!text) return null;
                    let color = '';
                    const activeColorBtn = part.querySelector('.color-btn.active');
                    if (activeColorBtn) {
                        color = activeColorBtn.dataset.color;
                    } else {
                        const customColor = part.querySelector('.custom-color').value.trim();
                        if (customColor) {
                            color = customColor;
                        }
                    }
                    const styles = {
                        underlined: part.querySelector('.style-checkbox[data-style="underlined"]').checked,
                        strikethrough: part.querySelector('.style-checkbox[data-style="strikethrough"]').checked,
                        obfuscated: part.querySelector('.style-checkbox[data-style="obfuscated"]').checked,
                        italic: part.querySelector('.style-checkbox[data-style="italic"]').checked
                    };
                    return { text, color, styles };
                })
                .filter(part => part !== null);
            if (validNameParts.length > 0) {
                const nameJson = validNameParts.length === 1 
                    ? buildTextComponent(validNameParts[0])
                    : { text: "", extra: validNameParts.map(part => buildTextComponent(part)) };
                nbtTags.push(`minecraft:custom_name='${JSON.stringify(nameJson)}'`);
            }
        }
        
        // 命令生成/自定义描述（minecraft:lore）
        if (commandState.loreEnabled) {
            const validLoreLines = Array.from(loreLinesContainer.querySelectorAll('.lore-line'))
                .map((line) => {
                    const validLineParts = Array.from(line.querySelectorAll('.lore-part'))
                        .map((part) => {
                            const text = part.querySelector('.lore-text').value.trim();
                            if (!text) return null;
                            let color = '';
                            const activeColorBtn = part.querySelector('.color-btn.active');
                            if (activeColorBtn) {
                                color = activeColorBtn.dataset.color;
                            } else {
                                const customColor = part.querySelector('.custom-color').value.trim();
                                if (customColor) {
                                    color = customColor;
                                }
                            }
                            const styles = {
                                underlined: part.querySelector('.style-checkbox[data-style="underlined"]').checked,
                                strikethrough: part.querySelector('.style-checkbox[data-style="strikethrough"]').checked,
                                obfuscated: part.querySelector('.style-checkbox[data-style="obfuscated"]').checked,
                                italic: part.querySelector('.style-checkbox[data-style="italic"]').checked
                            };
                            return { text, color, styles };
                        })
                        .filter(part => part !== null);
                    return validLineParts.length > 0 ? validLineParts : null;
                })
                .filter(line => line !== null);
            if (validLoreLines.length > 0) {
                const loreJson = validLoreLines.map(lineParts => {
                    return lineParts.length === 1
                        ? buildTextComponent(lineParts[0])
                        : { text: "", extra: lineParts.map(part => buildTextComponent(part)) };
                });
                nbtTags.push(`minecraft:lore=[${loreJson.map(line => `'${JSON.stringify(line)}'`).join(',')}]`);
            }
        }

        // 命令生成/附魔（enchantments）
        if (commandState.enchantmentEnabled) {
            const enchantments = Array.from(enchantmentPartsContainer.querySelectorAll('.enchantment-card'))
                .map(part => {
                    const id = part.querySelector('.enchantment-id').value.trim();
                    const level = parseInt(part.querySelector('.enchantment-level').value) || 1;
                    return id ? { id, level } : null;
                })
                .filter(enchant => enchant !== null);
            if (enchantments.length > 0) {
                const enchantJson = {};
                enchantments.forEach(enchant => {
                    enchantJson[enchant.id] = enchant.level;
                });
                nbtTags.push(`minecraft:enchantments=${JSON.stringify(enchantJson)}`);
            }
        }

        
        
        // 命令生成/属性修饰符（attribute_modifiers）
        if (commandState.attributeEnabled) {
            const attributes = Array.from(attributeModifiersContainer.querySelectorAll('.attribute-card'))
                .map((attribute) => {
                    const type = attribute.querySelector('.attribute-type').value;
                    const id = attribute.querySelector('.attribute-id').value.trim();
                    const operation = attribute.querySelector('.attribute-operation').value;
                    const amount = parseFloat(attribute.querySelector('.attribute-amount').value) || 0;
                     if (!type || !operation || isNaN(amount)) {
                        return null;
                    }
                    const attrObj = {
                        type: `"${type}"`,
                        id: `"${id}"`,
                        operation: `"${operation}"`,
                        amount: amount
                    };
                    const slot = attribute.querySelector('.attribute-slot').value;
                    if (slot) {
                        attrObj.slot = `"${slot}"`;
                    }
                    const displayType = attribute.querySelector('.display-type').value;
                    if (displayType && displayType !== 'default') {
                        attrObj.display = `{type:"${displayType}"}`;
                        
                        // 如果是自定义显示，添加自定义文本
                        if (displayType === 'override') {
                            const displayValue = attribute.querySelector('.display-value').value.trim();
                            if (displayValue) {
                                attrObj.display = `{type:"${displayType}",value:"${displayValue}"}`;
                            }
                        }
                    }
                    
                    // 转换为字符串形式
                    const attrStr = Object.entries(attrObj)
                        .map(([key, value]) => `${key}:${value}`)
                        .join(',');
                    
                    return `{${attrStr}}`;
                })
                .filter(attr => attr !== null);
            
            if (attributes.length > 0) {
                nbtTags.push(`attribute_modifiers=[${attributes.join(',')}]`);
            }
        }
        
        // 命令生成/数据组件组合设置
        if (nbtTags.length > 0) {
            itemPart += `[${nbtTags.join(',')}]`;
        }
        
        // 命令生成/添加数量
        itemPart += ` ${commandState.count}`;
        command += ` ${itemPart}`;
    }
    commandPreview.textContent = command;
}



// ————————————————————————————————————————————————————————————————————————————————
// 重置表单
// ————————————————————————————————————————————————————————————————————————————————
function resetForm() {
    commandState.command = '/give';
    commandState.target = '@p';
    commandState.itemId = '';
    commandState.count = 1;
    itemId.value = '';
    itemCount.value = 1;
    customTarget.value = '';
    commandBtns.forEach(btn => {
        if (btn.dataset.command === '/give') {
            btn.classList.remove('bg-gray-300', 'text-gray-500');
            btn.classList.add('bg-primary', 'text-white');
        } else {
            btn.classList.remove('bg-primary', 'text-white');
            btn.classList.add('bg-gray-300', 'text-gray-500');
        }
    });
    targetBtns.forEach(btn => {
        if (btn.dataset.target === '@p') {
            btn.classList.remove('bg-gray-100', 'text-gray-700', 'border-gray-300');
            btn.classList.add('bg-primary/10', 'text-primary', 'border-primary');
        } else {
            btn.classList.remove('bg-primary/10', 'text-primary', 'border-primary');
            btn.classList.add('bg-gray-100', 'text-gray-700', 'border-gray-300');
        }
    });
    commandState.nameEnabled = false;
    commandState.loreEnabled = false;
    commandState.enchantmentEnabled = false;
    commandState.attributeEnabled = false;
    nameToggle.checked = false;
    loreToggle.checked = false;
    enchantmentToggle.checked = false;
    attributeToggle.checked = false;
    toggleSection(nameSection, false);
    toggleSection(loreSection, false);
    toggleSection(enchantmentSection, false);
    toggleSection(attributeSection, false);
    namePartsContainer.innerHTML = '';
    addNamePart();
    loreLinesContainer.innerHTML = '';
    addLoreLine();
    enchantmentPartsContainer.innerHTML = '';
    attributeModifiersContainer.innerHTML = '';
    enchantmentRef.classList.add('hidden');
    updateCommandPreview();
}

// 初始化
document.addEventListener('DOMContentLoaded', init);